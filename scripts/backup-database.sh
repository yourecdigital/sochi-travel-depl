#!/bin/bash

# ===========================================
# Sochi Travel Database Backup Script
# 2025 Production Ready
# ===========================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="/opt/backups/sochi-travel"
LOG_FILE="/var/log/sochi-travel-backup.log"
COMPOSE_FILE="$PROJECT_DIR/docker-compose.prod.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a "$LOG_FILE"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}" | tee -a "$LOG_FILE"
}

# Load environment variables
load_env() {
    if [[ -f "$PROJECT_DIR/.env" ]]; then
        set -a
        source "$PROJECT_DIR/.env"
        set +a
        log "Environment variables loaded"
    else
        error "Environment file not found: $PROJECT_DIR/.env"
    fi
}

# Create backup directory
setup_backup_dir() {
    mkdir -p "$BACKUP_DIR"/{database,uploads,config}
    log "Backup directory created: $BACKUP_DIR"
}

# Database backup
backup_database() {
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="$BACKUP_DIR/database/sochi_travel_$backup_timestamp.sql"
    local compressed_file="$backup_file.gz"
    local encrypted_file="$compressed_file.gpg"
    
    log "Starting database backup..."
    
    # Check if MariaDB container is running
    if ! docker-compose -f "$COMPOSE_FILE" ps mariadb | grep -q "Up"; then
        error "MariaDB container is not running"
    fi
    
    # Create database backup
    if docker-compose -f "$COMPOSE_FILE" exec -T mariadb \
        mysqldump -u root -p"$DB_ROOT_PASSWORD" \
        --single-transaction \
        --routines \
        --triggers \
        --events \
        --all-databases \
        --add-drop-database \
        --add-drop-table \
        --add-drop-trigger \
        --complete-insert \
        --extended-insert \
        --lock-tables=false \
        --quick \
        --routines \
        --triggers \
        > "$backup_file"; then
        
        log "Database backup created: $backup_file"
        
        # Compress backup
        if gzip "$backup_file"; then
            log "Backup compressed: $compressed_file"
            
            # Encrypt backup if encryption is enabled
            if [[ "${BACKUP_ENCRYPTION:-false}" == "true" ]]; then
                if command -v gpg &> /dev/null; then
                    if gpg --batch --yes --passphrase "$DB_ROOT_PASSWORD" --cipher-algo AES256 --compress-algo 1 --symmetric "$compressed_file"; then
                        log "Backup encrypted: $encrypted_file"
                        rm -f "$compressed_file"
                    else
                        warn "Failed to encrypt backup"
                    fi
                else
                    warn "GPG not available, skipping encryption"
                fi
            fi
            
            # Verify backup
            if [[ -f "$compressed_file" ]] || [[ -f "$encrypted_file" ]]; then
                local final_file="${encrypted_file:-$compressed_file}"
                local file_size=$(du -h "$final_file" | cut -f1)
                log "Backup completed successfully: $final_file ($file_size)"
            else
                error "Backup file not found after compression/encryption"
            fi
        else
            error "Failed to compress backup"
        fi
    else
        error "Database backup failed"
    fi
}

# Uploads backup
backup_uploads() {
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local uploads_backup="$BACKUP_DIR/uploads/uploads_$backup_timestamp.tar.gz"
    
    log "Starting uploads backup..."
    
    # Check if uploads directory exists
    if [[ -d "$PROJECT_DIR/server/uploads" ]]; then
        if tar -czf "$uploads_backup" -C "$PROJECT_DIR/server" uploads; then
            local file_size=$(du -h "$uploads_backup" | cut -f1)
            log "Uploads backup created: $uploads_backup ($file_size)"
        else
            warn "Failed to create uploads backup"
        fi
    else
        warn "Uploads directory not found: $PROJECT_DIR/server/uploads"
    fi
}

# Configuration backup
backup_config() {
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local config_backup="$BACKUP_DIR/config/config_$backup_timestamp.tar.gz"
    
    log "Starting configuration backup..."
    
    # Create temporary directory for config files
    local temp_dir=$(mktemp -d)
    
    # Copy configuration files
    cp "$PROJECT_DIR/.env" "$temp_dir/" 2>/dev/null || true
    cp "$PROJECT_DIR/docker-compose.prod.yml" "$temp_dir/" 2>/dev/null || true
    cp "$PROJECT_DIR/nginx.production.conf" "$temp_dir/" 2>/dev/null || true
    cp -r "$PROJECT_DIR/scripts" "$temp_dir/" 2>/dev/null || true
    cp -r "$PROJECT_DIR/monitoring" "$temp_dir/" 2>/dev/null || true
    
    # Create config backup
    if tar -czf "$config_backup" -C "$temp_dir" .; then
        local file_size=$(du -h "$config_backup" | cut -f1)
        log "Configuration backup created: $config_backup ($file_size)"
    else
        warn "Failed to create configuration backup"
    fi
    
    # Cleanup
    rm -rf "$temp_dir"
}

# Cleanup old backups
cleanup_old_backups() {
    local retention_days="${BACKUP_RETENTION_DAYS:-30}"
    
    log "Cleaning up backups older than $retention_days days..."
    
    # Cleanup database backups
    find "$BACKUP_DIR/database" -name "*.sql.gz*" -type f -mtime +$retention_days -delete 2>/dev/null || true
    
    # Cleanup uploads backups
    find "$BACKUP_DIR/uploads" -name "*.tar.gz" -type f -mtime +$retention_days -delete 2>/dev/null || true
    
    # Cleanup config backups
    find "$BACKUP_DIR/config" -name "*.tar.gz" -type f -mtime +$retention_days -delete 2>/dev/null || true
    
    log "Old backups cleaned up"
}

# Upload to S3 (optional)
upload_to_s3() {
    if [[ "${S3_BACKUP_BUCKET:-}" != "" ]] && command -v aws &> /dev/null; then
        local backup_timestamp=$(date +%Y%m%d_%H%M%S)
        local s3_path="s3://$S3_BACKUP_BUCKET/sochi-travel-backups/$backup_timestamp/"
        
        log "Uploading backups to S3: $s3_path"
        
        # Upload database backups
        aws s3 sync "$BACKUP_DIR/database" "$s3_path/database/" --delete 2>/dev/null || warn "Failed to upload database backups to S3"
        
        # Upload uploads backups
        aws s3 sync "$BACKUP_DIR/uploads" "$s3_path/uploads/" --delete 2>/dev/null || warn "Failed to upload uploads backups to S3"
        
        # Upload config backups
        aws s3 sync "$BACKUP_DIR/config" "$s3_path/config/" --delete 2>/dev/null || warn "Failed to upload config backups to S3"
        
        log "S3 upload completed"
    else
        info "S3 backup not configured or AWS CLI not available"
    fi
}

# Send notification (optional)
send_notification() {
    local status="$1"
    local message="$2"
    
    if [[ "${TELEGRAM_BOT_TOKEN:-}" != "" ]] && [[ "${TELEGRAM_CHAT_ID:-}" != "" ]]; then
        local telegram_message="🔄 Sochi Travel Backup $status%0A%0A$message%0A%0A$(date)"
        
        curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
            -d chat_id="$TELEGRAM_CHAT_ID" \
            -d text="$telegram_message" \
            -d parse_mode="HTML" &>/dev/null || true
    fi
}

# Main function
main() {
    local start_time=$(date +%s)
    
    log "Starting Sochi Travel backup process..."
    
    # Load environment
    load_env
    
    # Setup
    setup_backup_dir
    
    # Perform backups
    backup_database
    backup_uploads
    backup_config
    
    # Cleanup
    cleanup_old_backups
    
    # Upload to S3
    upload_to_s3
    
    # Calculate duration
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log "Backup process completed successfully in ${duration}s"
    
    # Send success notification
    send_notification "✅ SUCCESS" "Backup completed successfully in ${duration}s"
}

# Error handling
trap 'error "Backup failed at line $LINENO"' ERR

# Run main function
main "$@"

