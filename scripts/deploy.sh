#!/bin/bash

# Sochi Travel Deployment Script for Ubuntu 22.04
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
BACKUP_DIR="/opt/backups/sochi-travel"
DOMAIN="${DOMAIN:-localhost}"

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root. Use sudo when needed."
    fi
}

check_dependencies() {
    log "Checking system dependencies..."
    
    # Check Ubuntu version
    if ! grep -q "22.04" /etc/os-release; then
        warn "This script is optimized for Ubuntu 22.04. Current system: $(lsb_release -d)"
    fi
    
    # Check required packages
    local required_packages=("docker.io" "docker-compose" "nginx" "certbot" "ufw")
    local missing_packages=()
    
    for package in "${required_packages[@]}"; do
        if ! dpkg -l | grep -q "^ii  $package "; then
            missing_packages+=("$package")
        fi
    done
    
    if [[ ${#missing_packages[@]} -gt 0 ]]; then
        log "Installing missing packages: ${missing_packages[*]}"
        sudo apt update
        sudo apt install -y "${missing_packages[@]}"
    fi
    
    # Check Docker
    if ! docker --version &> /dev/null; then
        error "Docker is not installed or not running"
    fi
    
    # Check Docker Compose
    if ! docker-compose --version &> /dev/null; then
        error "Docker Compose is not installed"
    fi
}

setup_environment() {
    log "Setting up environment..."
    
    # Create project directory
    sudo mkdir -p "$PROJECT_DIR"
    sudo mkdir -p "$BACKUP_DIR"
    
    # Set permissions
    sudo chown -R $USER:$USER "$PROJECT_DIR"
    
    # Copy environment file if it doesn't exist
    if [[ ! -f "$PROJECT_DIR/.env" ]]; then
        if [[ -f "env.example" ]]; then
            cp env.example "$PROJECT_DIR/.env"
            warn "Please edit $PROJECT_DIR/.env with your actual configuration"
        else
            error "Environment file not found. Please create $PROJECT_DIR/.env"
        fi
    fi
}

setup_firewall() {
    log "Configuring firewall..."
    
    # Enable UFW if not already enabled
    if ! sudo ufw status | grep -q "Status: active"; then
        sudo ufw --force enable
    fi
    
    # Allow SSH
    sudo ufw allow ssh
    
    # Allow HTTP and HTTPS
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    
    # Allow API port (for direct access if needed)
    sudo ufw allow 4000/tcp
    
    log "Firewall configured"
}

setup_ssl() {
    if [[ "$DOMAIN" != "localhost" ]]; then
        log "Setting up SSL certificate for $DOMAIN..."
        
        # Install certbot if not installed
        if ! command -v certbot &> /dev/null; then
            sudo apt install -y certbot python3-certbot-nginx
        fi
        
        # Get SSL certificate
        sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email admin@"$DOMAIN" || {
            warn "SSL certificate setup failed. You may need to configure it manually."
        }
    else
        log "Skipping SSL setup for localhost"
    fi
}

backup_database() {
    log "Creating database backup..."
    
    local backup_file="$BACKUP_DIR/db_backup_$(date +%Y%m%d_%H%M%S).sql"
    
    if docker-compose exec -T mariadb mysqldump -u root -p"${DB_ROOT_PASSWORD}" --all-databases > "$backup_file"; then
        log "Database backup created: $backup_file"
    else
        warn "Database backup failed"
    fi
}

deploy_application() {
    log "Deploying application..."
    
    # Pull latest images
    docker-compose pull
    
    # Build if needed
    docker-compose build --no-cache
    
    # Start services
    docker-compose up -d
    
    # Wait for services to be healthy
    log "Waiting for services to be ready..."
    sleep 30
    
    # Check health
    if curl -f http://localhost/health &> /dev/null; then
        log "Application deployed successfully"
    else
        error "Application health check failed"
    fi
}

setup_monitoring() {
    log "Setting up basic monitoring..."
    
    # Create log rotation
    sudo tee /etc/logrotate.d/sochi-travel > /dev/null <<EOF
$PROJECT_DIR/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
}
EOF

    # Create systemd service for monitoring
    sudo tee /etc/systemd/system/sochi-travel.service > /dev/null <<EOF
[Unit]
Description=Sochi Travel Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable sochi-travel.service
}

main() {
    log "Starting Sochi Travel deployment on Ubuntu 22.04"
    
    check_root
    check_dependencies
    setup_environment
    setup_firewall
    
    # Load environment variables
    if [[ -f "$PROJECT_DIR/.env" ]]; then
        set -a
        source "$PROJECT_DIR/.env"
        set +a
    fi
    
    backup_database
    deploy_application
    setup_ssl
    setup_monitoring
    
    log "Deployment completed successfully!"
    log "Application is available at: http://$DOMAIN"
    log "API is available at: http://$DOMAIN/api"
    log "Admin panel: http://$DOMAIN/admin"
    
    echo ""
    log "Next steps:"
    echo "1. Edit $PROJECT_DIR/.env with your configuration"
    echo "2. Run 'docker-compose restart' to apply changes"
    echo "3. Check logs with 'docker-compose logs -f'"
    echo "4. Monitor with 'sudo systemctl status sochi-travel'"
}

# Run main function
main "$@"

