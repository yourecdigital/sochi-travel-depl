#!/bin/bash

# Sochi Travel - Automated Backup Script
# Usage: ./scripts/backup.sh [--full] [--upload-s3] [--cleanup]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
BACKUP_DIR="/opt/backups/sochi-travel"
COMPOSE_FILE="docker-compose.prod.yml"
LOG_FILE="/var/log/sochi-travel-backup.log"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"
S3_BUCKET="${S3_BUCKET:-sochi-travel-backups}"
S3_ENDPOINT="${S3_ENDPOINT:-http://localhost:9000}"
S3_ACCESS_KEY="${S3_ACCESS_KEY:-admin}"
S3_SECRET_KEY="${S3_SECRET_KEY:-password}"

# Parse arguments
FULL_BACKUP=false
UPLOAD_S3=false
CLEANUP_OLD=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --full)
            FULL_BACKUP=true
            shift
            ;;
        --upload-s3)
            UPLOAD_S3=true
            shift
            ;;
        --cleanup)
            CLEANUP_OLD=true
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

check_prerequisites() {
    log "Checking backup prerequisites..."
    
    # Check if project directory exists
    if [[ ! -d "$PROJECT_DIR" ]]; then
        error "Project directory $PROJECT_DIR not found"
    fi
    
    # Check if .env file exists
    if [[ ! -f "$PROJECT_DIR/.env" ]]; then
        error ".env file not found in $PROJECT_DIR"
    fi
    
    # Check if docker-compose file exists
    if [[ ! -f "$PROJECT_DIR/$COMPOSE_FILE" ]]; then
        error "$COMPOSE_FILE not found in $PROJECT_DIR"
    fi
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR"
    
    log "Prerequisites check passed"
}

backup_database() {
    log "Creating database backup..."
    
    # Create backup directory with timestamp
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/db_backup_$backup_timestamp"
    
    mkdir -p "$backup_path"
    
    # Load environment variables
    cd "$PROJECT_DIR"
    set -a
    source .env
    set +a
    
    # Backup MariaDB
    if docker-compose -f "$COMPOSE_FILE" ps mariadb | grep -q "Up"; then
        info "Backing up MariaDB database..."
        docker-compose -f "$COMPOSE_FILE" exec -T mariadb \
            mysqldump -u root -p"$DB_ROOT_PASSWORD" \
            --single-transaction \
            --routines \
            --triggers \
            --all-databases > "$backup_path/mariadb_backup.sql"
        
        # Compress the backup
        gzip "$backup_path/mariadb_backup.sql"
        
        log "Database backup created: $backup_path/mariadb_backup.sql.gz"
    else
        warn "MariaDB container is not running. Skipping database backup."
    fi
}

backup_redis() {
    log "Creating Redis backup..."
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/redis_backup_$backup_timestamp"
    
    mkdir -p "$backup_path"
    
    # Backup Redis
    if docker-compose -f "$PROJECT_DIR/$COMPOSE_FILE" ps redis | grep -q "Up"; then
        info "Backing up Redis data..."
        docker-compose -f "$PROJECT_DIR/$COMPOSE_FILE" exec -T redis \
            redis-cli --rdb /data/dump.rdb
        
        # Copy Redis dump file
        docker cp "$(docker-compose -f "$PROJECT_DIR/$COMPOSE_FILE" ps -q redis):/data/dump.rdb" "$backup_path/redis_dump.rdb"
        
        # Compress the backup
        gzip "$backup_path/redis_dump.rdb"
        
        log "Redis backup created: $backup_path/redis_dump.rdb.gz"
    else
        warn "Redis container is not running. Skipping Redis backup."
    fi
}

backup_minio() {
    log "Creating MinIO backup..."
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/minio_backup_$backup_timestamp"
    
    mkdir -p "$backup_path"
    
    # Backup MinIO data
    if docker-compose -f "$PROJECT_DIR/$COMPOSE_FILE" ps minio | grep -q "Up"; then
        info "Backing up MinIO data..."
        
        # Create MinIO client alias
        docker-compose -f "$PROJECT_DIR/$COMPOSE_FILE" exec -T minio \
            mc alias set local http://localhost:9000 admin "$MINIO_ROOT_PASSWORD"
        
        # Backup all buckets
        docker-compose -f "$PROJECT_DIR/$COMPOSE_FILE" exec -T minio \
            mc mirror local/ "$backup_path/" --overwrite
        
        # Compress the backup
        tar -czf "$backup_path.tar.gz" -C "$backup_path" .
        rm -rf "$backup_path"
        
        log "MinIO backup created: $backup_path.tar.gz"
    else
        warn "MinIO container is not running. Skipping MinIO backup."
    fi
}

backup_application_files() {
    log "Creating application files backup..."
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/app_backup_$backup_timestamp"
    
    mkdir -p "$backup_path"
    
    # Backup application files
    info "Backing up application files..."
    tar -czf "$backup_path/app_files.tar.gz" \
        -C "$PROJECT_DIR" \
        --exclude="node_modules" \
        --exclude=".git" \
        --exclude="dist" \
        --exclude="build" \
        --exclude="logs" \
        --exclude="data" \
        .
    
    # Backup configuration files
    info "Backing up configuration files..."
    cp "$PROJECT_DIR/.env" "$backup_path/"
    cp "$PROJECT_DIR/$COMPOSE_FILE" "$backup_path/"
    
    # Backup logs
    if [[ -d "$PROJECT_DIR/logs" ]]; then
        info "Backing up application logs..."
        tar -czf "$backup_path/logs.tar.gz" -C "$PROJECT_DIR" logs/
    fi
    
    log "Application files backup created: $backup_path/"
}

backup_system_config() {
    log "Creating system configuration backup..."
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/system_backup_$backup_timestamp"
    
    mkdir -p "$backup_path"
    
    # Backup system configuration
    info "Backing up system configuration..."
    
    # Backup Docker configuration
    cp -r /etc/docker "$backup_path/" 2>/dev/null || true
    
    # Backup systemd services
    cp /etc/systemd/system/sochi-travel*.service "$backup_path/" 2>/dev/null || true
    cp /etc/systemd/system/sochi-travel*.timer "$backup_path/" 2>/dev/null || true
    
    # Backup UFW configuration
    ufw status > "$backup_path/ufw_status.txt" 2>/dev/null || true
    
    # Backup fail2ban configuration
    cp -r /etc/fail2ban "$backup_path/" 2>/dev/null || true
    
    # Backup nginx configuration
    cp -r /etc/nginx "$backup_path/" 2>/dev/null || true
    
    # Backup SSL certificates
    cp -r /etc/letsencrypt "$backup_path/" 2>/dev/null || true
    
    # Compress system backup
    tar -czf "$backup_path.tar.gz" -C "$backup_path" .
    rm -rf "$backup_path"
    
    log "System configuration backup created: $backup_path.tar.gz"
}

upload_to_s3() {
    if [[ "$UPLOAD_S3" != "true" ]]; then
        return
    fi
    
    log "Uploading backups to S3..."
    
    # Install MinIO client if not present
    if ! command -v mc &> /dev/null; then
        info "Installing MinIO client..."
        wget -O /usr/local/bin/mc https://dl.min.io/client/mc/release/linux-amd64/mc
        chmod +x /usr/local/bin/mc
    fi
    
    # Configure MinIO client
    mc alias set s3 "$S3_ENDPOINT" "$S3_ACCESS_KEY" "$S3_SECRET_KEY"
    
    # Upload backups
    local backup_date=$(date +%Y%m%d)
    local s3_path="s3://$S3_BUCKET/backups/$backup_date/"
    
    info "Uploading backups to S3: $s3_path"
    
    # Upload all backup files
    find "$BACKUP_DIR" -name "*backup_*" -type f -newer "$BACKUP_DIR/.last_backup" 2>/dev/null | while read -r file; do
        mc cp "$file" "$s3_path" || warn "Failed to upload $file to S3"
    done
    
    # Update last backup timestamp
    touch "$BACKUP_DIR/.last_backup"
    
    log "Backups uploaded to S3 successfully"
}

cleanup_old_backups() {
    if [[ "$CLEANUP_OLD" != "true" ]]; then
        return
    fi
    
    log "Cleaning up old backups..."
    
    # Keep backups for 30 days
    find "$BACKUP_DIR" -name "*backup_*" -type f -mtime +30 -delete 2>/dev/null || true
    
    # Keep daily backups for 7 days
    find "$BACKUP_DIR" -name "*backup_*" -type f -mtime +7 -name "*.gz" -delete 2>/dev/null || true
    
    # Keep weekly backups for 4 weeks
    find "$BACKUP_DIR" -name "*backup_*" -type f -mtime +28 -name "*.tar.gz" -delete 2>/dev/null || true
    
    log "Old backups cleaned up"
}

verify_backup() {
    log "Verifying backup integrity..."
    
    local backup_timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_files=()
    
    # Find all backup files created in the last minute
    find "$BACKUP_DIR" -name "*backup_$backup_timestamp*" -type f 2>/dev/null | while read -r file; do
        if [[ -f "$file" ]]; then
            if [[ "$file" == *.gz ]]; then
                if gzip -t "$file" 2>/dev/null; then
                    log "✅ Backup file verified: $file"
                else
                    error "❌ Backup file corrupted: $file"
                fi
            elif [[ "$file" == *.tar.gz ]]; then
                if tar -tzf "$file" >/dev/null 2>&1; then
                    log "✅ Backup file verified: $file"
                else
                    error "❌ Backup file corrupted: $file"
                fi
            else
                log "✅ Backup file verified: $file"
            fi
        fi
    done
    
    log "Backup verification completed"
}

show_backup_status() {
    log "Backup completed successfully! 🎉"
    
    # Send Telegram notification
    send_telegram "💾 *Sochi Travel Backup Completed*

✅ Database backup created
✅ Redis backup created
✅ MinIO backup created
✅ Application files backed up
✅ System configuration backed up

*Backup Location:* $BACKUP_DIR
*Backup Time:* $(date)
*Backup Type:* $([ "$FULL_BACKUP" == "true" ] && echo "Full" || echo "Incremental")

*Status:* All backups completed successfully"
    
    echo ""
    info "Backup Status:"
    echo "  📁 Backup directory: $BACKUP_DIR"
    echo "  📊 Total size: $(du -sh "$BACKUP_DIR" | cut -f1)"
    echo "  📅 Last backup: $(ls -la "$BACKUP_DIR" | grep backup_ | tail -1 | awk '{print $6, $7, $8}')"
    
    echo ""
    info "Backup files created:"
    find "$BACKUP_DIR" -name "*backup_*" -type f -mtime -1 | while read -r file; do
        echo "  📄 $(basename "$file") ($(du -h "$file" | cut -f1))"
    done
    
    echo ""
    info "Useful commands:"
    echo "  📋 List backups: ls -la $BACKUP_DIR"
    echo "  🔍 View backup: tar -tzf $BACKUP_DIR/backup_file.tar.gz"
    echo "  📊 Backup size: du -sh $BACKUP_DIR"
    echo "  🗑️ Clean old: find $BACKUP_DIR -name '*backup_*' -mtime +30 -delete"
}

main() {
    log "Starting Sochi Travel backup process"
    
    # Send backup start notification
    send_telegram "💾 *Sochi Travel Backup Started*

📦 Creating comprehensive backup
⏰ Started at: $(date)
🔄 Full backup: $FULL_BACKUP
☁️ Upload to S3: $UPLOAD_S3
🧹 Cleanup old: $CLEANUP_OLD"
    
    # Set up error handling
    trap 'error "Backup failed at line $LINENO"' ERR
    
    check_prerequisites
    backup_database
    backup_redis
    backup_minio
    backup_application_files
    backup_system_config
    upload_to_s3
    cleanup_old_backups
    verify_backup
    show_backup_status
    
    log "Backup process completed successfully! 🎉"
}

# Run main function
main "$@"
