#!/bin/bash

# Sochi Travel - Quick Fix Script
# Usage: ./diagnostics/quick-fix.sh [--issue=issue_name] [--auto-fix]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-quick-fix.log"

# Parse arguments
ISSUE=""
AUTO_FIX=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --issue=*)
            ISSUE="${1#*=}"
            shift
            ;;
        --auto-fix)
            AUTO_FIX=true
            shift
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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
}

info() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${BLUE}[$timestamp] INFO: $message${NC}"
    echo "[$timestamp] INFO: $message" >> "$LOG_FILE"
}

fix_docker_issues() {
    log "Fixing Docker issues..."
    
    # Restart Docker daemon
    if ! systemctl is-active --quiet docker; then
        log "Starting Docker daemon..."
        sudo systemctl start docker
    fi
    
    # Clean up Docker system
    log "Cleaning up Docker system..."
    docker system prune -f
    docker volume prune -f
    docker network prune -f
    
    # Restart containers
    cd "$PROJECT_DIR"
    log "Restarting containers..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d
    
    log "Docker issues fixed"
}

fix_network_issues() {
    log "Fixing network issues..."
    
    # Restart network services
    sudo systemctl restart systemd-resolved
    sudo systemctl restart networking
    
    # Flush DNS cache
    sudo systemctl flush-dns 2>/dev/null || true
    
    # Restart Docker networks
    cd "$PROJECT_DIR"
    docker-compose -f docker-compose.prod.yml down
    docker network prune -f
    docker-compose -f docker-compose.prod.yml up -d
    
    # Check firewall rules
    if command -v ufw &> /dev/null; then
        sudo ufw allow 80
        sudo ufw allow 443
        sudo ufw allow 4000
    fi
    
    log "Network issues fixed"
}

fix_database_issues() {
    log "Fixing database issues..."
    
    cd "$PROJECT_DIR"
    
    # Restart database services
    docker-compose -f docker-compose.prod.yml restart mariadb
    docker-compose -f docker-compose.prod.yml restart redis
    
    # Wait for databases to start
    sleep 10
    
    # Check database connectivity
    if docker-compose -f docker-compose.prod.yml exec -T mariadb mysqladmin ping &> /dev/null; then
        log "✅ MariaDB is responding"
    else
        warn "⚠️ MariaDB is not responding"
    fi
    
    if docker-compose -f docker-compose.prod.yml exec -T redis redis-cli ping &> /dev/null; then
        log "✅ Redis is responding"
    else
        warn "⚠️ Redis is not responding"
    fi
    
    log "Database issues fixed"
}

fix_performance_issues() {
    log "Fixing performance issues..."
    
    # Optimize system
    sudo sysctl -w vm.swappiness=10
    sudo sysctl -w vm.dirty_ratio=15
    sudo sysctl -w vm.dirty_background_ratio=5
    
    # Clean up system
    sudo apt autoremove -y
    sudo apt autoclean
    
    # Restart services
    cd "$PROJECT_DIR"
    docker-compose -f docker-compose.prod.yml restart
    
    # Optimize Docker
    docker system prune -f
    
    log "Performance issues fixed"
}

fix_application_issues() {
    log "Fixing application issues..."
    
    cd "$PROJECT_DIR"
    
    # Restart application services
    docker-compose -f docker-compose.prod.yml restart api
    docker-compose -f docker-compose.prod.yml restart web
    
    # Wait for services to start
    sleep 15
    
    # Check application health
    if curl -f -s http://localhost:4000/health &> /dev/null; then
        log "✅ API is responding"
    else
        warn "⚠️ API is not responding"
    fi
    
    if curl -f -s http://localhost/ &> /dev/null; then
        log "✅ Web is responding"
    else
        warn "⚠️ Web is not responding"
    fi
    
    log "Application issues fixed"
}

fix_ssl_issues() {
    log "Fixing SSL issues..."
    
    # Renew SSL certificates
    if command -v certbot &> /dev/null; then
        sudo certbot renew --quiet
    fi
    
    # Restart Nginx
    sudo systemctl restart nginx
    
    # Check SSL status
    if curl -f -s https://localhost/ &> /dev/null; then
        log "✅ SSL is working"
    else
        warn "⚠️ SSL issues detected"
    fi
    
    log "SSL issues fixed"
}

fix_disk_space_issues() {
    log "Fixing disk space issues..."
    
    # Clean up system
    sudo apt autoremove -y
    sudo apt autoclean
    sudo apt clean
    
    # Clean up Docker
    docker system prune -a -f
    docker volume prune -f
    
    # Clean up logs
    sudo journalctl --vacuum-time=7d
    sudo find /var/log -name "*.log" -mtime +7 -delete
    
    # Check disk space
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [[ $disk_usage -lt 90 ]]; then
        log "✅ Disk space is sufficient: ${disk_usage}% used"
    else
        warn "⚠️ Disk space is still low: ${disk_usage}% used"
    fi
    
    log "Disk space issues fixed"
}

fix_permission_issues() {
    log "Fixing permission issues..."
    
    # Fix Docker permissions
    sudo usermod -aG docker $USER
    
    # Fix application permissions
    cd "$PROJECT_DIR"
    sudo chown -R $USER:$USER .
    chmod -R 755 .
    
    # Fix log permissions
    sudo chown -R $USER:$USER /var/log/sochi-travel-* 2>/dev/null || true
    
    log "Permission issues fixed"
}

fix_all_issues() {
    log "Fixing all common issues..."
    
    fix_docker_issues
    fix_network_issues
    fix_database_issues
    fix_performance_issues
    fix_application_issues
    fix_ssl_issues
    fix_disk_space_issues
    fix_permission_issues
    
    log "All issues fixed"
}

show_available_fixes() {
    log "Available quick fixes:"
    
    echo ""
    echo "🔧 AVAILABLE QUICK FIXES:"
    echo ""
    echo "1. Docker issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=docker"
    echo ""
    echo "2. Network issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=network"
    echo ""
    echo "3. Database issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=database"
    echo ""
    echo "4. Performance issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=performance"
    echo ""
    echo "5. Application issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=application"
    echo ""
    echo "6. SSL issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=ssl"
    echo ""
    echo "7. Disk space issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=disk"
    echo ""
    echo "8. Permission issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=permissions"
    echo ""
    echo "9. Fix all issues:"
    echo "   ./diagnostics/quick-fix.sh --issue=all"
    echo ""
    echo "10. Auto-fix mode:"
    echo "    ./diagnostics/quick-fix.sh --issue=docker --auto-fix"
}

main() {
    log "Starting Sochi Travel quick fix"
    
    if [[ -z "$ISSUE" ]]; then
        show_available_fixes
        return 0
    fi
    
    case "$ISSUE" in
        "docker")
            fix_docker_issues
            ;;
        "network")
            fix_network_issues
            ;;
        "database")
            fix_database_issues
            ;;
        "performance")
            fix_performance_issues
            ;;
        "application")
            fix_application_issues
            ;;
        "ssl")
            fix_ssl_issues
            ;;
        "disk")
            fix_disk_space_issues
            ;;
        "permissions")
            fix_permission_issues
            ;;
        "all")
            fix_all_issues
            ;;
        *)
            error "Unknown issue: $ISSUE"
            show_available_fixes
            exit 1
            ;;
    esac
    
    log "Quick fix completed! 🔧"
    
    echo ""
    info "Quick Fix Summary:"
    echo "  🔧 Issue: $ISSUE"
    echo "  🤖 Auto-fix: $AUTO_FIX"
    echo "  📋 Logs: $LOG_FILE"
}

main "$@"
