#!/bin/bash

# Production Deployment Script for Sochi Travel
# Usage: ./scripts/deploy-production.sh [--with-monitoring]

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
BACKUP_DIR="/opt/backups/sochi-travel"
COMPOSE_FILE="docker-compose.prod.yml"

# Parse arguments
WITH_MONITORING=false
if [[ "${1:-}" == "--with-monitoring" ]]; then
    WITH_MONITORING=true
fi

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

check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if running as root
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root. Use sudo when needed."
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    # Check if .env file exists
    if [[ ! -f ".env" ]]; then
        error ".env file not found. Please run ./scripts/setup-secrets.sh first"
    fi
    
    # Check if docker-compose.prod.yml exists
    if [[ ! -f "$COMPOSE_FILE" ]]; then
        error "$COMPOSE_FILE not found"
    fi
    
    log "Prerequisites check passed"
}

setup_directories() {
    log "Setting up directories..."
    
    # Create necessary directories
    sudo mkdir -p "$PROJECT_DIR"/{data/{mariadb,redis,minio,prometheus,grafana},logs,backups}
    sudo mkdir -p "$BACKUP_DIR"
    
    # Set proper permissions
    sudo chown -R $USER:$USER "$PROJECT_DIR"
    sudo chown -R $USER:$USER "$BACKUP_DIR"
    
    # Copy project files
    if [[ "$PWD" != "$PROJECT_DIR" ]]; then
        log "Copying project files to $PROJECT_DIR"
        sudo cp -r . "$PROJECT_DIR/"
        sudo chown -R $USER:$USER "$PROJECT_DIR"
        cd "$PROJECT_DIR"
    fi
    
    log "Directories setup completed"
}

backup_database() {
    log "Creating database backup..."
    
    # Create backup directory with timestamp
    BACKUP_TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_PATH="$BACKUP_DIR/db_backup_$BACKUP_TIMESTAMP"
    
    mkdir -p "$BACKUP_PATH"
    
    # Load environment variables
    set -a
    source .env
    set +a
    
    # Backup MariaDB
    if docker-compose -f "$COMPOSE_FILE" ps mariadb | grep -q "Up"; then
        docker-compose -f "$COMPOSE_FILE" exec -T mariadb \
            mysqldump -u root -p"$DB_ROOT_PASSWORD" \
            --single-transaction \
            --routines \
            --triggers \
            --all-databases > "$BACKUP_PATH/mariadb_backup.sql"
        
        log "Database backup created: $BACKUP_PATH/mariadb_backup.sql"
    else
        warn "MariaDB container is not running. Skipping backup."
    fi
    
    # Cleanup old backups (keep last 7 days)
    find "$BACKUP_DIR" -name "db_backup_*" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
}

deploy_services() {
    log "Deploying services..."
    
    # Pull latest images
    info "Pulling latest Docker images..."
    docker-compose -f "$COMPOSE_FILE" pull
    
    # Build images
    info "Building Docker images..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache
    
    # Start services
    info "Starting services..."
    if [[ "$WITH_MONITORING" == "true" ]]; then
        docker-compose -f "$COMPOSE_FILE" --profile monitoring up -d
        log "Services started with monitoring enabled"
    else
        docker-compose -f "$COMPOSE_FILE" up -d
        log "Services started without monitoring"
    fi
    
    # Wait for services to be healthy
    info "Waiting for services to be healthy..."
    sleep 30
    
    # Check health
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f http://localhost/health &> /dev/null; then
            log "Application health check passed"
            break
        else
            info "Health check attempt $attempt/$max_attempts failed. Retrying in 10 seconds..."
            sleep 10
            ((attempt++))
        fi
    done
    
    if [[ $attempt -gt $max_attempts ]]; then
        error "Application health check failed after $max_attempts attempts"
    fi
}

setup_ssl() {
    log "Setting up SSL certificate..."
    
    # Load environment variables
    set -a
    source .env
    set +a
    
    if [[ "$DOMAIN" != "localhost" ]]; then
        # Install certbot if not installed
        if ! command -v certbot &> /dev/null; then
            sudo apt update
            sudo apt install -y certbot python3-certbot-nginx
        fi
        
        # Get SSL certificate
        sudo certbot --nginx -d "$DOMAIN" \
            --non-interactive \
            --agree-tos \
            --email "$SSL_EMAIL" \
            --redirect || {
            warn "SSL certificate setup failed. You may need to configure it manually."
        }
    else
        log "Skipping SSL setup for localhost"
    fi
}

setup_monitoring() {
    if [[ "$WITH_MONITORING" == "true" ]]; then
        log "Setting up monitoring..."
        
        # Wait for Prometheus and Grafana to be ready
        info "Waiting for monitoring services to be ready..."
        sleep 60
        
        # Check if services are running
        if docker-compose -f "$COMPOSE_FILE" ps prometheus | grep -q "Up"; then
            log "Prometheus is running at http://localhost:9090"
        else
            warn "Prometheus failed to start"
        fi
        
        if docker-compose -f "$COMPOSE_FILE" ps grafana | grep -q "Up"; then
            log "Grafana is running at http://localhost:3000"
            info "Default Grafana credentials: admin / $GRAFANA_PASSWORD"
        else
            warn "Grafana failed to start"
        fi
    fi
}

show_status() {
    log "Deployment completed successfully!"
    echo ""
    info "Service Status:"
    docker-compose -f "$COMPOSE_FILE" ps
    
    echo ""
    info "Application URLs:"
    echo "  🌐 Web Frontend: http://localhost"
    echo "  🔌 API Backend: http://localhost:4000"
    echo "  📊 MinIO Console: http://localhost:9001"
    
    if [[ "$WITH_MONITORING" == "true" ]]; then
        echo "  📈 Prometheus: http://localhost:9090"
        echo "  📊 Grafana: http://localhost:3000"
    fi
    
    echo ""
    info "Useful commands:"
    echo "  📋 View logs: docker-compose -f $COMPOSE_FILE logs -f"
    echo "  🔄 Restart: docker-compose -f $COMPOSE_FILE restart"
    echo "  🛑 Stop: docker-compose -f $COMPOSE_FILE down"
    echo "  📊 Status: docker-compose -f $COMPOSE_FILE ps"
    
    echo ""
    warn "Important:"
    echo "  - Change all default passwords in .env file"
    echo "  - Configure SSL certificates for production"
    echo "  - Set up regular database backups"
    echo "  - Monitor application logs and metrics"
}

main() {
    log "Starting Sochi Travel production deployment"
    
    check_prerequisites
    setup_directories
    backup_database
    deploy_services
    setup_ssl
    setup_monitoring
    show_status
    
    log "Production deployment completed successfully! 🚀"
}

# Run main function
main "$@"

