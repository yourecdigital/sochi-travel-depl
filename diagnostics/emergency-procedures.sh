#!/bin/bash

# Sochi Travel - Emergency Procedures Script
# Usage: ./diagnostics/emergency-procedures.sh [--action=restart|rollback|backup|restore] [--service=api|web|db]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-emergency.log"
BACKUP_DIR="/opt/backups/sochi-travel"
ROLLBACK_DIR="/opt/rollbacks/sochi-travel"

# Parse arguments
ACTION=""
SERVICE=""
FORCE=false
BACKUP_BEFORE=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --action=*)
            ACTION="${1#*=}"
            shift
            ;;
        --service=*)
            SERVICE="${1#*=}"
            shift
            ;;
        --force)
            FORCE=true
            shift
            ;;
        --no-backup)
            BACKUP_BEFORE=false
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

confirm_action() {
    local action="$1"
    local service="$2"
    
    if [[ "$FORCE" == "true" ]]; then
        return 0
    fi
    
    echo -e "${YELLOW}⚠️ WARNING: This will $action $service${NC}"
    echo -e "${YELLOW}Are you sure you want to continue? (yes/no): ${NC}"
    read -r response
    
    if [[ "$response" == "yes" ]]; then
        return 0
    else
        log "Action cancelled by user"
        exit 0
    fi
}

create_emergency_backup() {
    log "Creating emergency backup..."
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/emergency_$backup_timestamp"
    
    mkdir -p "$backup_path"
    
    # Backup database
    log "Backing up database..."
    cd "$PROJECT_DIR"
    docker-compose -f docker-compose.prod.yml exec -T mariadb mysqldump -u root -p"${DB_ROOT_PASSWORD}" --all-databases > "$backup_path/database.sql"
    
    # Backup Redis data
    log "Backing up Redis data..."
    docker-compose -f docker-compose.prod.yml exec -T redis redis-cli --rdb "$backup_path/redis.rdb"
    
    # Backup application files
    log "Backing up application files..."
    cp -r "$PROJECT_DIR" "$backup_path/application"
    
    # Backup configuration files
    log "Backing up configuration files..."
    cp -r /etc/nginx "$backup_path/nginx_config"
    cp -r /etc/systemd/system/sochi-travel* "$backup_path/systemd_config" 2>/dev/null || true
    
    # Create backup manifest
    {
        echo "Emergency Backup Manifest"
        echo "========================="
        echo "Created: $(date)"
        echo "Backup Path: $backup_path"
        echo "Database: $backup_path/database.sql"
        echo "Redis: $backup_path/redis.rdb"
        echo "Application: $backup_path/application"
        echo "Nginx Config: $backup_path/nginx_config"
        echo "Systemd Config: $backup_path/systemd_config"
    } > "$backup_path/backup_manifest.txt"
    
    log "Emergency backup created: $backup_path"
    echo "$backup_path"
}

restart_service() {
    local service="$1"
    
    log "Restarting service: $service"
    
    cd "$PROJECT_DIR"
    
    if [[ -z "$service" ]]; then
        # Restart all services
        log "Restarting all services..."
        docker-compose -f docker-compose.prod.yml restart
        
        # Restart systemd services
        sudo systemctl restart sochi-travel
        sudo systemctl restart nginx
    else
        # Restart specific service
        log "Restarting service: $service"
        docker-compose -f docker-compose.prod.yml restart "$service"
        
        # Restart related systemd services
        case "$service" in
            "api"|"web")
                sudo systemctl restart sochi-travel
                ;;
            "mariadb")
                sudo systemctl restart mysql
                ;;
        esac
    fi
    
    # Wait for services to start
    sleep 10
    
    # Check service status
    check_service_status "$service"
}

check_service_status() {
    local service="$1"
    
    log "Checking service status..."
    
    cd "$PROJECT_DIR"
    
    if [[ -z "$service" ]]; then
        # Check all services
        local services=$(docker-compose -f docker-compose.prod.yml ps --services)
        
        for svc in $services; do
            local container_name="sochi-travel-${svc}-prod"
            if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
                local status=$(docker inspect --format='{{.State.Status}}' "$container_name")
                local health=$(docker inspect --format='{{.State.Health.Status}}' "$container_name" 2>/dev/null || echo "unknown")
                
                if [[ "$status" == "running" ]]; then
                    if [[ "$health" == "healthy" ]]; then
                        log "✅ Service $svc is running and healthy"
                    else
                        warn "⚠️ Service $svc is running but unhealthy"
                    fi
                else
                    error "❌ Service $svc is not running (Status: $status)"
                fi
            else
                error "❌ Container for service $svc not found"
            fi
        done
    else
        # Check specific service
        local container_name="sochi-travel-${service}-prod"
        if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
            local status=$(docker inspect --format='{{.State.Status}}' "$container_name")
            local health=$(docker inspect --format='{{.State.Health.Status}}' "$container_name" 2>/dev/null || echo "unknown")
            
            if [[ "$status" == "running" ]]; then
                if [[ "$health" == "healthy" ]]; then
                    log "✅ Service $service is running and healthy"
                else
                    warn "⚠️ Service $service is running but unhealthy"
                fi
            else
                error "❌ Service $service is not running (Status: $status)"
            fi
        else
            error "❌ Container for service $service not found"
        fi
    fi
}

rollback_service() {
    local service="$1"
    
    log "Rolling back service: $service"
    
    # Find latest backup
    local latest_backup=$(find "$BACKUP_DIR" -name "emergency_*" -type d | sort | tail -1)
    
    if [[ -z "$latest_backup" ]]; then
        error "No backup found for rollback"
        return 1
    fi
    
    log "Using backup: $latest_backup"
    
    cd "$PROJECT_DIR"
    
    if [[ -z "$service" ]]; then
        # Rollback all services
        log "Rolling back all services..."
        
        # Stop all services
        docker-compose -f docker-compose.prod.yml down
        
        # Restore database
        if [[ -f "$latest_backup/database.sql" ]]; then
            log "Restoring database..."
            docker-compose -f docker-compose.prod.yml up -d mariadb
            sleep 10
            docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -u root -p"${DB_ROOT_PASSWORD}" < "$latest_backup/database.sql"
        fi
        
        # Restore Redis data
        if [[ -f "$latest_backup/redis.rdb" ]]; then
            log "Restoring Redis data..."
            docker-compose -f docker-compose.prod.yml up -d redis
            sleep 5
            docker cp "$latest_backup/redis.rdb" sochi-travel-redis-prod:/data/dump.rdb
            docker-compose -f docker-compose.prod.yml restart redis
        fi
        
        # Restore application files
        if [[ -d "$latest_backup/application" ]]; then
            log "Restoring application files..."
            cp -r "$latest_backup/application"/* "$PROJECT_DIR/"
        fi
        
        # Restore configuration files
        if [[ -d "$latest_backup/nginx_config" ]]; then
            log "Restoring Nginx configuration..."
            sudo cp -r "$latest_backup/nginx_config"/* /etc/nginx/
            sudo systemctl reload nginx
        fi
        
        # Start all services
        docker-compose -f docker-compose.prod.yml up -d
        
    else
        # Rollback specific service
        log "Rolling back service: $service"
        
        # Stop specific service
        docker-compose -f docker-compose.prod.yml stop "$service"
        
        # Restore service-specific data
        case "$service" in
            "mariadb")
                if [[ -f "$latest_backup/database.sql" ]]; then
                    log "Restoring database..."
                    docker-compose -f docker-compose.prod.yml up -d mariadb
                    sleep 10
                    docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -u root -p"${DB_ROOT_PASSWORD}" < "$latest_backup/database.sql"
                fi
                ;;
            "redis")
                if [[ -f "$latest_backup/redis.rdb" ]]; then
                    log "Restoring Redis data..."
                    docker-compose -f docker-compose.prod.yml up -d redis
                    sleep 5
                    docker cp "$latest_backup/redis.rdb" sochi-travel-redis-prod:/data/dump.rdb
                    docker-compose -f docker-compose.prod.yml restart redis
                fi
                ;;
            "api"|"web")
                if [[ -d "$latest_backup/application" ]]; then
                    log "Restoring application files..."
                    cp -r "$latest_backup/application"/* "$PROJECT_DIR/"
                fi
                docker-compose -f docker-compose.prod.yml up -d "$service"
                ;;
        esac
    fi
    
    # Wait for services to start
    sleep 15
    
    # Check service status
    check_service_status "$service"
}

restore_from_backup() {
    local backup_path="$1"
    
    if [[ -z "$backup_path" ]]; then
        # Find latest backup
        backup_path=$(find "$BACKUP_DIR" -name "emergency_*" -type d | sort | tail -1)
    fi
    
    if [[ -z "$backup_path" || ! -d "$backup_path" ]]; then
        error "No backup found for restore"
        return 1
    fi
    
    log "Restoring from backup: $backup_path"
    
    cd "$PROJECT_DIR"
    
    # Stop all services
    docker-compose -f docker-compose.prod.yml down
    
    # Restore database
    if [[ -f "$backup_path/database.sql" ]]; then
        log "Restoring database..."
        docker-compose -f docker-compose.prod.yml up -d mariadb
        sleep 10
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -u root -p"${DB_ROOT_PASSWORD}" < "$backup_path/database.sql"
    fi
    
    # Restore Redis data
    if [[ -f "$backup_path/redis.rdb" ]]; then
        log "Restoring Redis data..."
        docker-compose -f docker-compose.prod.yml up -d redis
        sleep 5
        docker cp "$backup_path/redis.rdb" sochi-travel-redis-prod:/data/dump.rdb
        docker-compose -f docker-compose.prod.yml restart redis
    fi
    
    # Restore application files
    if [[ -d "$backup_path/application" ]]; then
        log "Restoring application files..."
        cp -r "$backup_path/application"/* "$PROJECT_DIR/"
    fi
    
    # Restore configuration files
    if [[ -d "$backup_path/nginx_config" ]]; then
        log "Restoring Nginx configuration..."
        sudo cp -r "$backup_path/nginx_config"/* /etc/nginx/
        sudo systemctl reload nginx
    fi
    
    # Start all services
    docker-compose -f docker-compose.prod.yml up -d
    
    # Wait for services to start
    sleep 15
    
    # Check service status
    check_service_status
}

show_emergency_commands() {
    log "Emergency procedures commands:"
    
    echo ""
    echo "🚨 EMERGENCY PROCEDURES:"
    echo ""
    echo "1. Quick restart all services:"
    echo "   ./diagnostics/emergency-procedures.sh --action=restart"
    echo ""
    echo "2. Restart specific service:"
    echo "   ./diagnostics/emergency-procedures.sh --action=restart --service=api"
    echo "   ./diagnostics/emergency-procedures.sh --action=restart --service=web"
    echo "   ./diagnostics/emergency-procedures.sh --action=restart --service=mariadb"
    echo ""
    echo "3. Rollback all services:"
    echo "   ./diagnostics/emergency-procedures.sh --action=rollback"
    echo ""
    echo "4. Rollback specific service:"
    echo "   ./diagnostics/emergency-procedures.sh --action=rollback --service=api"
    echo ""
    echo "5. Create emergency backup:"
    echo "   ./diagnostics/emergency-procedures.sh --action=backup"
    echo ""
    echo "6. Restore from backup:"
    echo "   ./diagnostics/emergency-procedures.sh --action=restore"
    echo ""
    echo "7. Manual emergency commands:"
    echo "   docker-compose -f docker-compose.prod.yml down"
    echo "   docker-compose -f docker-compose.prod.yml up -d"
    echo "   sudo systemctl restart sochi-travel"
    echo "   sudo systemctl restart nginx"
    echo ""
    echo "8. Check service status:"
    echo "   docker-compose -f docker-compose.prod.yml ps"
    echo "   docker-compose -f docker-compose.prod.yml logs"
    echo ""
    echo "9. Force restart (no confirmation):"
    echo "   ./diagnostics/emergency-procedures.sh --action=restart --force"
}

main() {
    log "Starting Sochi Travel emergency procedures"
    
    # Create necessary directories
    mkdir -p "$BACKUP_DIR" "$ROLLBACK_DIR"
    
    case "$ACTION" in
        "restart")
            if [[ "$BACKUP_BEFORE" == "true" ]]; then
                create_emergency_backup
            fi
            confirm_action "restart" "${SERVICE:-all services}"
            restart_service "$SERVICE"
            ;;
        "rollback")
            confirm_action "rollback" "${SERVICE:-all services}"
            rollback_service "$SERVICE"
            ;;
        "backup")
            create_emergency_backup
            ;;
        "restore")
            confirm_action "restore" "all services"
            restore_from_backup
            ;;
        "")
            show_emergency_commands
            ;;
        *)
            error "Unknown action: $ACTION"
            echo "Available actions: restart, rollback, backup, restore"
            exit 1
            ;;
    esac
    
    log "Emergency procedures completed! 🚨"
    
    echo ""
    info "Emergency Procedures Summary:"
    echo "  🚨 Action: ${ACTION:-show commands}"
    echo "  🔧 Service: ${SERVICE:-all}"
    echo "  💾 Backup before: $BACKUP_BEFORE"
    echo "  ⚡ Force: $FORCE"
    echo "  📋 Logs: $LOG_FILE"
}

main "$@"
