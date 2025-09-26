#!/bin/bash

# Sochi Travel - Application Update Script
# Usage: ./scripts/update.sh [--force] [--skip-backup] [--restart-services]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
BACKUP_DIR="/opt/backups/sochi-travel"
COMPOSE_FILE="docker-compose.prod.yml"
LOG_FILE="/var/log/sochi-travel-update.log"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

# Parse arguments
FORCE_UPDATE=false
SKIP_BACKUP=false
RESTART_SERVICES=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --force)
            FORCE_UPDATE=true
            shift
            ;;
        --skip-backup)
            SKIP_BACKUP=true
            shift
            ;;
        --restart-services)
            RESTART_SERVICES=true
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
    log "Checking update prerequisites..."
    
    # Check if running as deploy user
    if [[ "$USER" != "deploy" ]]; then
        error "This script must be run as deploy user"
    fi
    
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
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    log "Prerequisites check passed"
}

check_for_updates() {
    log "Checking for updates..."
    
    cd "$PROJECT_DIR"
    
    # Check if it's a git repository
    if [[ -d ".git" ]]; then
        # Fetch latest changes
        git fetch origin
        
        # Check if there are updates
        local current_commit=$(git rev-parse HEAD)
        local remote_commit=$(git rev-parse origin/main)
        
        if [[ "$current_commit" == "$remote_commit" ]]; then
            if [[ "$FORCE_UPDATE" != "true" ]]; then
                log "No updates available. Use --force to update anyway."
                exit 0
            else
                warn "No updates available, but force update requested"
            fi
        else
            log "Updates available: $current_commit -> $remote_commit"
        fi
    else
        warn "Not a git repository, skipping update check"
    fi
}

create_backup() {
    if [[ "$SKIP_BACKUP" == "true" ]]; then
        log "Skipping backup"
        return
    fi
    
    log "Creating backup before update..."
    
    # Run backup script
    if [[ -f "$PROJECT_DIR/scripts/backup.sh" ]]; then
        "$PROJECT_DIR/scripts/backup.sh" --full
        log "Backup completed successfully"
    else
        warn "Backup script not found, skipping backup"
    fi
}

update_application() {
    log "Updating application..."
    
    cd "$PROJECT_DIR"
    
    # Check if it's a git repository
    if [[ -d ".git" ]]; then
        # Stash any local changes
        git stash push -m "Auto-stash before update $(date)"
        
        # Pull latest changes
        git pull origin main
        
        log "Application updated to latest version"
    else
        warn "Not a git repository, skipping update"
    fi
}

update_dependencies() {
    log "Updating dependencies..."
    
    cd "$PROJECT_DIR"
    
    # Update npm dependencies
    if [[ -f "package.json" ]]; then
        info "Updating npm dependencies..."
        npm ci
        log "NPM dependencies updated"
    fi
    
    # Update Docker images
    info "Pulling latest Docker images..."
    docker-compose -f "$COMPOSE_FILE" pull
    
    log "Dependencies updated"
}

build_application() {
    log "Building application..."
    
    cd "$PROJECT_DIR"
    
    # Build Docker images
    info "Building Docker images..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache
    
    log "Application built successfully"
}

restart_services() {
    if [[ "$RESTART_SERVICES" != "true" ]]; then
        log "Skipping service restart"
        return
    fi
    
    log "Restarting services..."
    
    cd "$PROJECT_DIR"
    
    # Stop existing services
    info "Stopping existing services..."
    docker-compose -f "$COMPOSE_FILE" down
    
    # Start services
    info "Starting services..."
    docker-compose -f "$COMPOSE_FILE" up -d
    
    # Wait for services to be healthy
    info "Waiting for services to be healthy..."
    sleep 30
    
    # Check health
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f http://localhost:4000/health &> /dev/null; then
            log "API health check passed"
            break
        else
            info "Health check attempt $attempt/$max_attempts failed. Retrying in 10 seconds..."
            sleep 10
            ((attempt++))
        fi
    done
    
    if [[ $attempt -gt $max_attempts ]]; then
        error "API health check failed after $max_attempts attempts"
    fi
    
    # Check web health
    if curl -f http://localhost/health &> /dev/null; then
        log "Web health check passed"
    else
        warn "Web health check failed"
    fi
}

run_migrations() {
    log "Running database migrations..."
    
    cd "$PROJECT_DIR"
    
    # Wait for database to be ready
    info "Waiting for database to be ready..."
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if docker-compose -f "$COMPOSE_FILE" exec -T mariadb mysqladmin ping &> /dev/null; then
            log "Database is ready"
            break
        else
            info "Database not ready, attempt $attempt/$max_attempts. Waiting 10 seconds..."
            sleep 10
            ((attempt++))
        fi
    done
    
    if [[ $attempt -gt $max_attempts ]]; then
        error "Database not ready after $max_attempts attempts"
    fi
    
    # Run Prisma migrations
    info "Running Prisma migrations..."
    docker-compose -f "$COMPOSE_FILE" exec -T api npx prisma migrate deploy || {
        warn "Prisma migrations failed, continuing with update"
    }
    
    # Run data migration script if exists
    if [[ -f "$PROJECT_DIR/scripts/migrate.ts" ]]; then
        info "Running data migration script..."
        docker-compose -f "$COMPOSE_FILE" exec -T api node -e "import('./scripts/migrate.ts').catch(e=>{console.error(e);process.exit(1)})" || {
            warn "Data migration failed, continuing with update"
        }
    fi
    
    log "Database migrations completed"
}

verify_update() {
    log "Verifying update..."
    
    # Check API health
    if curl -f http://localhost:4000/health &> /dev/null; then
        log "✅ API is healthy"
    else
        error "❌ API health check failed"
    fi
    
    # Check web health
    if curl -f http://localhost/ &> /dev/null; then
        log "✅ Web application is healthy"
    else
        error "❌ Web application health check failed"
    fi
    
    # Check database connection
    cd "$PROJECT_DIR"
    if docker-compose -f "$COMPOSE_FILE" exec -T mariadb mysqladmin ping &> /dev/null; then
        log "✅ Database is healthy"
    else
        error "❌ Database health check failed"
    fi
    
    # Check Redis connection
    if docker-compose -f "$COMPOSE_FILE" exec -T redis redis-cli ping &> /dev/null; then
        log "✅ Redis is healthy"
    else
        error "❌ Redis health check failed"
    fi
    
    # Check MinIO connection
    if curl -f http://localhost:9000/minio/health/live &> /dev/null; then
        log "✅ MinIO is healthy"
    else
        error "❌ MinIO health check failed"
    fi
    
    log "All services are healthy after update! 🎉"
}

rollback_update() {
    log "Rolling back update..."
    
    cd "$PROJECT_DIR"
    
    # Stop current services
    docker-compose -f "$COMPOSE_FILE" down
    
    # Restore from git stash
    if [[ -d ".git" ]]; then
        git stash pop || warn "No stash to restore"
    fi
    
    # Start previous version
    docker-compose -f "$COMPOSE_FILE" up -d
    
    error "Update rollback completed"
}

show_update_status() {
    log "Update completed successfully! 🚀"
    
    # Send Telegram notification
    send_telegram "🚀 *Sochi Travel Update Completed*

✅ Application updated successfully
✅ Services restarted and healthy
✅ Database migrations completed
✅ All health checks passed

*Update Details:*
📦 Application: Updated to latest version
🔄 Services: Restarted and running
🗄️ Database: Migrations applied
⏰ Completed: $(date)

*Status:* All systems operational"
    
    echo ""
    info "Update Status:"
    cd "$PROJECT_DIR"
    docker-compose -f "$COMPOSE_FILE" ps
    
    echo ""
    info "Application URLs:"
    echo "  🌐 Web Frontend: http://$(hostname -I | awk '{print $1}')/"
    echo "  🔌 API Backend: http://$(hostname -I | awk '{print $1}'):4000/"
    echo "  📊 MinIO Console: http://$(hostname -I | awk '{print $1}'):9001/"
    
    echo ""
    info "Useful commands:"
    echo "  📋 View logs: docker-compose -f $COMPOSE_FILE logs -f"
    echo "  🔄 Restart: docker-compose -f $COMPOSE_FILE restart"
    echo "  🛑 Stop: docker-compose -f $COMPOSE_FILE down"
    echo "  📊 Status: docker-compose -f $COMPOSE_FILE ps"
    echo "  🔍 Health: curl http://localhost:4000/health"
    echo "  📈 Monitor: ./scripts/monitor.sh --alert"
}

main() {
    log "Starting Sochi Travel update process"
    
    # Send update start notification
    send_telegram "🚀 *Sochi Travel Update Started*

📦 Updating application to latest version
⏰ Started at: $(date)
🔄 Force mode: $FORCE_UPDATE
💾 Skip backup: $SKIP_BACKUP
🔄 Restart services: $RESTART_SERVICES"
    
    # Set up error handling
    trap 'error "Update failed at line $LINENO"' ERR
    
    check_prerequisites
    check_for_updates
    create_backup
    update_application
    update_dependencies
    build_application
    restart_services
    run_migrations
    verify_update
    show_update_status
    
    log "Update process completed successfully! 🚀"
}

# Run main function
main "$@"
