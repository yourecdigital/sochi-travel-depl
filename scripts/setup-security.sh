#!/bin/bash

# ===========================================
# Security Setup Script for Sochi Travel
# 2025 Production Security Best Practices
# ===========================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root. Use sudo when needed."
    fi
}

# Install security packages
install_security_packages() {
    log "Installing security packages..."
    
    sudo apt update
    sudo apt install -y \
        fail2ban \
        ufw \
        unattended-upgrades \
        apt-listchanges \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        software-properties-common \
        htop \
        iotop \
        netstat-nat \
        tcpdump \
        nmap \
        chkrootkit \
        rkhunter \
        aide \
        logwatch \
        auditd \
        apparmor \
        apparmor-utils
    
    log "Security packages installed"
}

# Configure UFW firewall
setup_ufw() {
    log "Configuring UFW firewall..."
    
    # Reset UFW
    sudo ufw --force reset
    
    # Default policies
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    
    # Allow SSH (be careful with this!)
    sudo ufw allow ssh
    
    # Allow HTTP and HTTPS
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    
    # Allow API port (if needed externally)
    sudo ufw allow 4000/tcp
    
    # Allow monitoring ports (internal only)
    sudo ufw allow from 10.0.0.0/8 to any port 9090
    sudo ufw allow from 172.16.0.0/12 to any port 9090
    sudo ufw allow from 192.168.0.0/16 to any port 9090
    
    # Enable UFW
    sudo ufw --force enable
    
    log "UFW firewall configured and enabled"
}

# Configure Fail2Ban
setup_fail2ban() {
    log "Configuring Fail2Ban..."
    
    # Stop Fail2Ban
    sudo systemctl stop fail2ban
    
    # Copy custom filters
    sudo cp "$PROJECT_DIR/fail2ban/"*.conf /etc/fail2ban/filter.d/
    
    # Copy jail configuration
    sudo cp "$PROJECT_DIR/fail2ban/jail.local" /etc/fail2ban/jail.local
    
    # Set proper permissions
    sudo chmod 644 /etc/fail2ban/jail.local
    sudo chmod 644 /etc/fail2ban/filter.d/*.conf
    
    # Start and enable Fail2Ban
    sudo systemctl start fail2ban
    sudo systemctl enable fail2ban
    
    log "Fail2Ban configured and started"
}

# Configure automatic security updates
setup_auto_updates() {
    log "Configuring automatic security updates..."
    
    # Configure unattended-upgrades
    sudo tee /etc/apt/apt.conf.d/50unattended-upgrades > /dev/null <<EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
    "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    "\${distro_id}ESM:\${distro_codename}-infra-security";
};

Unattended-Upgrade::Package-Blacklist {
    "nginx";
    "docker.io";
    "docker-compose";
};

Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
EOF

    # Enable automatic updates
    sudo tee /etc/apt/apt.conf.d/20auto-upgrades > /dev/null <<EOF
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::Automatic-Reboot "0";
EOF

    log "Automatic security updates configured"
}

# Configure system hardening
setup_system_hardening() {
    log "Configuring system hardening..."
    
    # Configure sysctl for security
    sudo tee /etc/sysctl.d/99-security.conf > /dev/null <<EOF
# Network security
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.default.accept_source_route = 0

# IP Spoofing protection
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Disable IP source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# Disable ICMP redirect acceptance
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

# Disable Secure ICMP Redirect Acceptance
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.default.secure_redirects = 0

# Log Suspicious Packets
net.ipv4.conf.all.log_martians = 1

# Ignore Directed pings
net.ipv4.icmp_echo_ignore_all = 1

# Disable IPv6 if not needed
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1

# Kernel security
kernel.dmesg_restrict = 1
kernel.kptr_restrict = 2
kernel.yama.ptrace_scope = 1
kernel.core_uses_pid = 1
kernel.ctrl-alt-del = 0

# Memory protection
vm.mmap_rnd_bits = 32
vm.mmap_rnd_compat_bits = 16
vm.unprivileged_userfaultfd = 0

# File system
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
fs.suid_dumpable = 0
EOF

    # Apply sysctl settings
    sudo sysctl -p /etc/sysctl.d/99-security.conf
    
    log "System hardening configured"
}

# Configure AppArmor
setup_apparmor() {
    log "Configuring AppArmor..."
    
    # Enable AppArmor
    sudo systemctl enable apparmor
    sudo systemctl start apparmor
    
    # Set AppArmor profiles to enforce mode
    sudo aa-enforce /etc/apparmor.d/*
    
    log "AppArmor configured and enabled"
}

# Configure auditd
setup_auditd() {
    log "Configuring auditd..."
    
    # Configure audit rules
    sudo tee /etc/audit/rules.d/sochi-travel.rules > /dev/null <<EOF
# Sochi Travel audit rules

# Monitor file access
-w /opt/sochi-travel -p rwxa -k sochi-travel
-w /opt/sochi-travel/.env -p rwxa -k sochi-travel-env
-w /opt/sochi-travel/docker-compose.prod.yml -p rwxa -k sochi-travel-compose

# Monitor system files
-w /etc/passwd -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/sudoers -p wa -k identity

# Monitor network configuration
-w /etc/network/ -p wa -k network-config
-w /etc/ufw/ -p wa -k firewall-config

# Monitor SSH configuration
-w /etc/ssh/sshd_config -p wa -k ssh-config

# Monitor Docker
-w /var/lib/docker -p rwxa -k docker
-w /etc/docker/ -p wa -k docker-config

# Monitor nginx
-w /etc/nginx/ -p wa -k nginx-config
-w /var/log/nginx/ -p wa -k nginx-logs

# Monitor database
-w /var/lib/mysql/ -p rwxa -k mysql-data
-w /etc/mysql/ -p wa -k mysql-config
EOF

    # Restart auditd
    sudo systemctl restart auditd
    sudo systemctl enable auditd
    
    log "Auditd configured and enabled"
}

# Configure log monitoring
setup_log_monitoring() {
    log "Configuring log monitoring..."
    
    # Configure logwatch
    sudo tee /etc/logwatch/conf/logwatch.conf > /dev/null <<EOF
LogDir = /var/log
TmpDir = /var/cache/logwatch
MailTo = admin@yourdomain.com
MailFrom = logwatch@yourdomain.com
Print = No
Save = /var/log/logwatch
Range = yesterday
Detail = Med
Service = All
Format = html
Encode = none
EOF

    # Create logwatch cron job
    echo "0 6 * * * /usr/sbin/logwatch --output mail --mailto admin@yourdomain.com --detail med" | sudo crontab -
    
    log "Log monitoring configured"
}

# Configure systemd security
setup_systemd_security() {
    log "Configuring systemd security..."
    
    # Copy systemd service files
    sudo cp "$PROJECT_DIR/systemd/"*.service /etc/systemd/system/
    sudo cp "$PROJECT_DIR/systemd/"*.timer /etc/systemd/system/
    
    # Reload systemd
    sudo systemctl daemon-reload
    
    # Enable services
    sudo systemctl enable sochi-travel.service
    sudo systemctl enable sochi-travel-backup.timer
    
    log "Systemd security configured"
}

# Configure SSL/TLS
setup_ssl() {
    log "Configuring SSL/TLS..."
    
    # Install certbot
    sudo apt install -y certbot python3-certbot-nginx
    
    # Create SSL directory
    sudo mkdir -p /etc/ssl/sochi-travel
    
    # Set proper permissions
    sudo chmod 700 /etc/ssl/sochi-travel
    sudo chown root:root /etc/ssl/sochi-travel
    
    log "SSL/TLS configuration prepared"
}

# Create security monitoring script
create_security_monitor() {
    log "Creating security monitoring script..."
    
    sudo tee /usr/local/bin/security-monitor.sh > /dev/null <<'EOF'
#!/bin/bash

# Security monitoring script for Sochi Travel

LOG_FILE="/var/log/security-monitor.log"
ALERT_EMAIL="admin@yourdomain.com"

log_alert() {
    echo "$(date): $1" >> "$LOG_FILE"
    # Send email alert if configured
    if command -v mail &> /dev/null; then
        echo "$1" | mail -s "Security Alert - Sochi Travel" "$ALERT_EMAIL"
    fi
}

# Check for failed login attempts
check_failed_logins() {
    local failed_count=$(grep "Failed password" /var/log/auth.log | wc -l)
    if [ "$failed_count" -gt 10 ]; then
        log_alert "High number of failed login attempts: $failed_count"
    fi
}

# Check for suspicious network activity
check_network_activity() {
    local connections=$(netstat -an | grep ESTABLISHED | wc -l)
    if [ "$connections" -gt 1000 ]; then
        log_alert "High number of network connections: $connections"
    fi
}

# Check disk usage
check_disk_usage() {
    local usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ "$usage" -gt 90 ]; then
        log_alert "High disk usage: $usage%"
    fi
}

# Check memory usage
check_memory_usage() {
    local usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
    if [ "$usage" -gt 90 ]; then
        log_alert "High memory usage: $usage%"
    fi
}

# Check Docker containers
check_docker_containers() {
    local stopped_containers=$(docker ps -a --filter "status=exited" | wc -l)
    if [ "$stopped_containers" -gt 5 ]; then
        log_alert "Multiple stopped Docker containers: $stopped_containers"
    fi
}

# Run all checks
check_failed_logins
check_network_activity
check_disk_usage
check_memory_usage
check_docker_containers
EOF

    sudo chmod +x /usr/local/bin/security-monitor.sh
    
    # Create cron job for security monitoring
    echo "*/15 * * * * /usr/local/bin/security-monitor.sh" | sudo crontab -
    
    log "Security monitoring script created"
}

# Main function
main() {
    log "Starting security setup for Sochi Travel..."
    
    check_root
    install_security_packages
    setup_ufw
    setup_fail2ban
    setup_auto_updates
    setup_system_hardening
    setup_apparmor
    setup_auditd
    setup_log_monitoring
    setup_systemd_security
    setup_ssl
    create_security_monitor
    
    log "Security setup completed successfully!"
    
    echo ""
    info "Security configuration summary:"
    echo "  🔥 UFW Firewall: Enabled with strict rules"
    echo "  🛡️  Fail2Ban: Configured with custom filters"
    echo "  🔄 Auto Updates: Security updates enabled"
    echo "  🔒 System Hardening: Applied security kernel parameters"
    echo "  🛡️  AppArmor: Enabled and enforced"
    echo "  📊 Auditd: Configured for system monitoring"
    echo "  📝 Log Monitoring: Logwatch configured"
    echo "  🔧 Systemd: Security services enabled"
    echo "  🔐 SSL/TLS: Prepared for certificate installation"
    echo "  👁️  Security Monitor: Active monitoring script"
    
    echo ""
    warn "Important next steps:"
    echo "  1. Review UFW rules: sudo ufw status verbose"
    echo "  2. Check Fail2Ban status: sudo fail2ban-client status"
    echo "  3. Install SSL certificates: sudo certbot --nginx"
    echo "  4. Review audit logs: sudo ausearch -k sochi-travel"
    echo "  5. Test security monitoring: /usr/local/bin/security-monitor.sh"
}

# Run main function
main "$@"

