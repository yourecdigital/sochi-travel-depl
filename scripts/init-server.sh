#!/bin/bash

# Sochi Travel - Ubuntu 22.04 Server Initialization Script
# Usage: sudo ./scripts/init-server.sh

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
BACKUP_DIR="/opt/backups/sochi-travel"
DEPLOY_USER="deploy"
LOG_FILE="/var/log/sochi-travel-init.log"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${GREEN}[$timestamp] $message${NC}"
    echo "[$timestamp] $message" >> "$LOG_FILE"
}

warn() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${YELLOW}[$timestamp] WARNING: $message${NC}"
    echo "[$timestamp] WARNING: $message" >> "$LOG_FILE"
}

error() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${RED}[$timestamp] ERROR: $message${NC}"
    echo "[$timestamp] ERROR: $message" >> "$LOG_FILE"
    exit 1
}

info() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${BLUE}[$timestamp] INFO: $message${NC}"
    echo "[$timestamp] INFO: $message" >> "$LOG_FILE"
}

send_telegram() {
    local message="$1"
    if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
        curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
            -d chat_id="$TELEGRAM_CHAT_ID" \
            -d text="$message" \
            -d parse_mode="Markdown" >/dev/null 2>&1 || true
    fi
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root (use sudo)"
    fi
}

update_system() {
    log "Updating system packages..."
    
    apt update
    apt upgrade -y
    
    # Install essential packages
    apt install -y \
        curl \
        wget \
        git \
        unzip \
        htop \
        vim \
        nano \
        ufw \
        fail2ban \
        logwatch \
        unattended-upgrades \
        apt-transport-https \
        ca-certificates \
        gnupg \
        lsb-release \
        software-properties-common \
        jq \
        tree \
        rsync \
        cron \
        systemd-timesyncd \
        net-tools \
        dnsutils \
        tcpdump \
        iotop \
        nethogs
    
    log "System update completed"
}

setup_ufw() {
    log "Setting up UFW firewall..."
    
    # Reset UFW to defaults
    ufw --force reset
    
    # Set default policies
    ufw default deny incoming
    ufw default allow outgoing
    
    # Allow SSH (important - don't lock yourself out!)
    ufw allow 22/tcp comment 'SSH'
    
    # Allow HTTP and HTTPS
    ufw allow 80/tcp comment 'HTTP'
    ufw allow 443/tcp comment 'HTTPS'
    
    # Allow application ports
    ufw allow 4000/tcp comment 'API Backend'
    
    # Allow monitoring ports (optional)
    ufw allow 9090/tcp comment 'Prometheus'
    ufw allow 3000/tcp comment 'Grafana'
    
    # Enable UFW
    ufw --force enable
    
    # Show status
    ufw status verbose
    
    log "UFW firewall configured"
}

install_docker() {
    log "Installing Docker..."
    
    # Remove old Docker versions
    apt remove -y docker docker-engine docker.io containerd runc || true
    
    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Add Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Update package index
    apt update
    
    # Install Docker
    apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Start and enable Docker
    systemctl start docker
    systemctl enable docker
    
    # Add current user to docker group
    usermod -aG docker $SUDO_USER
    
    # Verify installation
    docker --version
    docker compose version
    
    log "Docker installed successfully"
}

setup_security() {
    log "Configuring security settings..."
    
    # Configure fail2ban
    cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-noscript]
enabled = true
filter = nginx-noscript
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 3

[nginx-badbots]
enabled = true
filter = nginx-badbots
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
EOF

    # Start and enable fail2ban
    systemctl start fail2ban
    systemctl enable fail2ban
    
    # Configure automatic security updates
    cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

    # Enable automatic updates
    echo 'APT::Periodic::Update-Package-Lists "1";' > /etc/apt/apt.conf.d/20auto-upgrades
    echo 'APT::Periodic::Unattended-Upgrade "1";' >> /etc/apt/apt.conf.d/20auto-upgrades
    
    # Configure logwatch
    cat > /etc/logwatch/conf/logwatch.conf << 'EOF'
MailTo = root
MailFrom = logwatch@localhost
Detail = Med
Service = All
Format = text
Encode = none
EOF

    # Set up log rotation for application logs
    cat > /etc/logrotate.d/sochi-travel << 'EOF'
/opt/sochi-travel/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
}
EOF

    log "Security configuration completed"
}

create_deploy_user() {
    log "Creating deployment user..."
    
    # Create deploy user if it doesn't exist
    if ! id "$DEPLOY_USER" &>/dev/null; then
        useradd -m -s /bin/bash "$DEPLOY_USER"
        usermod -aG docker "$DEPLOY_USER"
        usermod -aG sudo "$DEPLOY_USER"
        
        # Set up SSH directory
        mkdir -p "/home/$DEPLOY_USER/.ssh"
        chmod 700 "/home/$DEPLOY_USER/.ssh"
        chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
        
        log "Deploy user '$DEPLOY_USER' created"
    else
        log "Deploy user '$DEPLOY_USER' already exists"
    fi
}

setup_directories() {
    log "Setting up project directories..."
    
    # Create project directory
    mkdir -p "$PROJECT_DIR"/{data/{mariadb,redis,minio,prometheus,grafana},logs,backups,secrets}
    mkdir -p "$BACKUP_DIR"
    
    # Set proper permissions
    chown -R "$DEPLOY_USER:$DEPLOY_USER" "$PROJECT_DIR"
    chown -R "$DEPLOY_USER:$DEPLOY_USER" "$BACKUP_DIR"
    
    # Create systemd service directory
    mkdir -p /etc/systemd/system
    
    log "Directories created successfully"
}

configure_docker() {
    log "Configuring Docker daemon..."
    
    # Create Docker daemon configuration
    mkdir -p /etc/docker
    
    cat > /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "userland-proxy": false,
  "experimental": false,
  "metrics-addr": "127.0.0.1:9323",
  "default-address-pools": [
    {
      "base": "172.17.0.0/12",
      "size": 24
    }
  ]
}
EOF

    # Restart Docker to apply configuration
    systemctl restart docker
    
    log "Docker daemon configured"
}

setup_monitoring() {
    log "Setting up monitoring services..."
    
    # Create systemd service for application
    cat > /etc/systemd/system/sochi-travel.service << EOF
[Unit]
Description=Sochi Travel Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/bin/docker compose -f docker-compose.prod.yml up -d
ExecStop=/usr/bin/docker compose -f docker-compose.prod.yml down
ExecReload=/usr/bin/docker compose -f docker-compose.prod.yml restart
User=$DEPLOY_USER
Group=$DEPLOY_USER

[Install]
WantedBy=multi-user.target
EOF

    # Create backup service
    cat > /etc/systemd/system/sochi-travel-backup.service << EOF
[Unit]
Description=Sochi Travel Database Backup
After=sochi-travel.service

[Service]
Type=oneshot
User=$DEPLOY_USER
Group=$DEPLOY_USER
WorkingDirectory=$PROJECT_DIR
ExecStart=/bin/bash -c 'if docker compose -f docker-compose.prod.yml ps mariadb | grep -q Up; then docker compose -f docker-compose.prod.yml exec -T mariadb mysqldump -u root -p"\$DB_ROOT_PASSWORD" --single-transaction --routines --triggers "\$DB_NAME" > $BACKUP_DIR/backup_\$(date +%Y%m%d_%H%M%S).sql; fi'
EOF

    # Create backup timer
    cat > /etc/systemd/system/sochi-travel-backup.timer << EOF
[Unit]
Description=Run Sochi Travel backup daily
Requires=sochi-travel-backup.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
EOF

    # Reload systemd and enable services
    systemctl daemon-reload
    systemctl enable sochi-travel-backup.timer
    
    log "Monitoring and services configured"
}

setup_ssl_preparation() {
    log "Preparing SSL certificate setup..."
    
    # Install certbot
    apt install -y certbot python3-certbot-nginx
    
    # Create nginx configuration directory
    mkdir -p /etc/nginx/sites-available
    mkdir -p /etc/nginx/sites-enabled
    
    log "SSL preparation completed"
}

create_environment_template() {
    log "Creating environment template..."
    
    cat > "$PROJECT_DIR/.env.example" << 'EOF'
# Database Configuration
DB_ROOT_PASSWORD=your_secure_root_password
DB_NAME=sochi_travel
DB_USER=sochi_user
DB_PASSWORD=your_secure_db_password

# Redis Configuration
REDIS_PASSWORD=your_secure_redis_password

# JWT Secrets (generate 64+ character random strings)
JWT_SECRET=your_64_character_jwt_secret_here
REFRESH_SECRET=your_64_character_refresh_secret_here

# MinIO Configuration
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=your_secure_minio_password
MINIO_BROWSER_REDIRECT_URL=http://localhost:9001

# S3 Configuration
S3_BUCKET=sochi-travel-uploads

# Application Configuration
API_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_VERSION=1.0.0

# Domain Configuration
DOMAIN=localhost
SSL_EMAIL=admin@localhost

# Monitoring (optional)
GRAFANA_PASSWORD=your_secure_grafana_password

# Build Configuration
BUILD_TIME=2025-01-01T00:00:00Z
VITE_BUILD_TIME=2025-01-01T00:00:00Z
EOF

    chown "$DEPLOY_USER:$DEPLOY_USER" "$PROJECT_DIR/.env.example"
    
    log "Environment template created"
}

show_completion_info() {
    log "Server initialization completed successfully! 🚀"
    
    # Send Telegram notification
    send_telegram "🚀 *Sochi Travel Server Initialized*

✅ System updated and secured
✅ Docker installed and configured
✅ Firewall configured
✅ Monitoring services ready
✅ Backup system configured

*Next steps:*
1. Deploy application: \`./scripts/deploy.sh\`
2. Configure environment: \`nano $PROJECT_DIR/.env\`
3. Start services: \`systemctl start sochi-travel\`"
    
    echo ""
    info "Server initialization completed!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Deploy your application: ./scripts/deploy.sh"
    echo "2. Configure environment: nano $PROJECT_DIR/.env"
    echo "3. Start services: systemctl start sochi-travel"
    echo ""
    echo "🔧 Useful commands:"
    echo "  📋 View logs: journalctl -u sochi-travel -f"
    echo "  🔄 Restart: systemctl restart sochi-travel"
    echo "  🛑 Stop: systemctl stop sochi-travel"
    echo "  📊 Status: systemctl status sochi-travel"
    echo "  🔥 Firewall: ufw status verbose"
    echo "  🛡️ Fail2ban: fail2ban-client status"
    echo ""
    warn "Important:"
    echo "  - Change all default passwords in .env file"
    echo "  - Configure SSH key authentication for deploy user"
    echo "  - Set up SSL certificates for production"
    echo "  - Monitor logs and metrics regularly"
}

main() {
    log "Starting Ubuntu 22.04 server initialization for Sochi Travel"
    
    check_root
    update_system
    setup_ufw
    install_docker
    setup_security
    create_deploy_user
    setup_directories
    configure_docker
    setup_monitoring
    setup_ssl_preparation
    create_environment_template
    show_completion_info
    
    log "Server initialization completed successfully! 🚀"
}

# Run main function
main "$@"
