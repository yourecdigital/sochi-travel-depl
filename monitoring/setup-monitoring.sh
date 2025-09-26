#!/bin/bash

# Sochi Travel - Monitoring Setup Script
# Usage: ./scripts/setup-monitoring.sh

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
MONITORING_DIR="/opt/sochi-travel/monitoring"
LOG_FILE="/var/log/sochi-travel-monitoring-setup.log"
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

check_prerequisites() {
    log "Checking monitoring setup prerequisites..."
    
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

setup_monitoring_directories() {
    log "Setting up monitoring directories..."
    
    # Create monitoring directories
    mkdir -p "$MONITORING_DIR"/{prometheus/rules,grafana/{dashboards,datasources},alertmanager,sentry,uptime,webhook}
    
    # Set proper permissions
    chown -R deploy:deploy "$MONITORING_DIR"
    
    log "Monitoring directories created"
}

copy_monitoring_configs() {
    log "Copying monitoring configurations..."
    
    # Copy Prometheus configuration
    if [[ -f "$PROJECT_DIR/monitoring/prometheus/prometheus.yml" ]]; then
        cp "$PROJECT_DIR/monitoring/prometheus/prometheus.yml" "$MONITORING_DIR/prometheus/"
        cp -r "$PROJECT_DIR/monitoring/prometheus/rules" "$MONITORING_DIR/prometheus/"
    fi
    
    # Copy Alertmanager configuration
    if [[ -f "$PROJECT_DIR/monitoring/alertmanager/alertmanager.yml" ]]; then
        cp "$PROJECT_DIR/monitoring/alertmanager/alertmanager.yml" "$MONITORING_DIR/alertmanager/"
    fi
    
    # Copy Grafana configurations
    if [[ -d "$PROJECT_DIR/monitoring/grafana" ]]; then
        cp -r "$PROJECT_DIR/monitoring/grafana"/* "$MONITORING_DIR/grafana/"
    fi
    
    # Copy Sentry configurations
    if [[ -d "$PROJECT_DIR/monitoring/sentry" ]]; then
        cp -r "$PROJECT_DIR/monitoring/sentry"/* "$MONITORING_DIR/sentry/"
    fi
    
    # Copy uptime monitoring
    if [[ -f "$PROJECT_DIR/monitoring/uptime/uptime-monitor.sh" ]]; then
        cp "$PROJECT_DIR/monitoring/uptime/uptime-monitor.sh" "$MONITORING_DIR/uptime/"
        chmod +x "$MONITORING_DIR/uptime/uptime-monitor.sh"
    fi
    
    log "Monitoring configurations copied"
}

setup_environment_variables() {
    log "Setting up environment variables for monitoring..."
    
    # Add monitoring variables to .env
    cat >> "$PROJECT_DIR/.env" << 'EOF'

# Monitoring Configuration
GRAFANA_PASSWORD=SochiTravel2025!GrafanaSecure
TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}

# Sentry Configuration
SENTRY_DSN=${SENTRY_DSN}
VITE_SENTRY_DSN=${VITE_SENTRY_DSN}

# Monitoring URLs
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3000
ALERTMANAGER_URL=http://localhost:9093
EOF

    log "Environment variables configured"
}

setup_sentry() {
    log "Setting up Sentry for error tracking..."
    
    # Install Sentry SDK in API
    cd "$PROJECT_DIR"
    if [[ -f "apps/api/package.json" ]]; then
        npm install @sentry/node @sentry/integrations
        log "Sentry SDK installed for API"
    fi
    
    # Install Sentry SDK in Web
    if [[ -f "apps/web/package.json" ]]; then
        npm install @sentry/react @sentry/tracing
        log "Sentry SDK installed for Web"
    fi
    
    # Copy Sentry configurations
    if [[ -f "$MONITORING_DIR/sentry/sentry.conf.py" ]]; then
        cp "$MONITORING_DIR/sentry/sentry.conf.py" "$PROJECT_DIR/apps/api/src/"
    fi
    
    if [[ -f "$MONITORING_DIR/sentry/sentry.client.js" ]]; then
        cp "$MONITORING_DIR/sentry/sentry.client.js" "$PROJECT_DIR/apps/web/src/"
    fi
    
    log "Sentry configuration completed"
}

setup_uptime_monitoring() {
    log "Setting up uptime monitoring..."
    
    # Create systemd service for uptime monitoring
    sudo tee /etc/systemd/system/sochi-travel-uptime.service > /dev/null << EOF
[Unit]
Description=Sochi Travel Uptime Monitoring
After=network.target

[Service]
Type=simple
User=deploy
Group=deploy
WorkingDirectory=$PROJECT_DIR
ExecStart=$MONITORING_DIR/uptime/uptime-monitor.sh
Restart=always
RestartSec=60

[Install]
WantedBy=multi-user.target
EOF

    # Create uptime monitoring timer
    sudo tee /etc/systemd/system/sochi-travel-uptime.timer > /dev/null << EOF
[Unit]
Description=Run Sochi Travel uptime monitoring every minute
Requires=sochi-travel-uptime.service

[Timer]
OnCalendar=*:*:00
Persistent=true

[Install]
WantedBy=timers.target
EOF

    # Reload systemd and enable services
    sudo systemctl daemon-reload
    sudo systemctl enable sochi-travel-uptime.timer
    sudo systemctl start sochi-travel-uptime.timer
    
    log "Uptime monitoring configured"
}

start_monitoring_stack() {
    log "Starting monitoring stack..."
    
    cd "$PROJECT_DIR"
    
    # Start monitoring services
    docker-compose -f monitoring/docker-compose.monitoring.yml up -d
    
    # Wait for services to be healthy
    info "Waiting for monitoring services to be healthy..."
    sleep 30
    
    # Check health
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f http://localhost:9090/-/healthy &> /dev/null; then
            log "Prometheus health check passed"
            break
        else
            info "Health check attempt $attempt/$max_attempts failed. Retrying in 10 seconds..."
            sleep 10
            ((attempt++))
        fi
    done
    
    if [[ $attempt -gt $max_attempts ]]; then
        error "Prometheus health check failed after $max_attempts attempts"
    fi
    
    # Check Grafana
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        log "Grafana health check passed"
    else
        warn "Grafana health check failed"
    fi
    
    # Check Alertmanager
    if curl -f http://localhost:9093/-/healthy &> /dev/null; then
        log "Alertmanager health check passed"
    else
        warn "Alertmanager health check failed"
    fi
    
    log "Monitoring stack started successfully"
}

verify_monitoring_setup() {
    log "Verifying monitoring setup..."
    
    # Check Prometheus
    if curl -f http://localhost:9090/-/healthy &> /dev/null; then
        log "✅ Prometheus is running"
    else
        error "❌ Prometheus is not running"
    fi
    
    # Check Grafana
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        log "✅ Grafana is running"
    else
        error "❌ Grafana is not running"
    fi
    
    # Check Alertmanager
    if curl -f http://localhost:9093/-/healthy &> /dev/null; then
        log "✅ Alertmanager is running"
    else
        error "❌ Alertmanager is not running"
    fi
    
    # Check uptime monitoring
    if systemctl is-active --quiet sochi-travel-uptime.timer; then
        log "✅ Uptime monitoring is active"
    else
        error "❌ Uptime monitoring is not active"
    fi
    
    log "All monitoring services are healthy! 🎉"
}

show_monitoring_status() {
    log "Monitoring setup completed successfully! 🚀"
    
    # Send Telegram notification
    send_telegram "📊 *Sochi Travel Monitoring Setup Completed*

✅ Prometheus configured and running
✅ Grafana configured with dashboards
✅ Alertmanager configured with alerts
✅ Sentry configured for error tracking
✅ Uptime monitoring configured
✅ All health checks passed

*Monitoring URLs:*
📊 Prometheus: http://$(hostname -I | awk '{print $1}'):9090
📈 Grafana: http://$(hostname -I | awk '{print $1}'):3000
🚨 Alertmanager: http://$(hostname -I | awk '{print $1}'):9093

*Credentials:*
👤 Grafana: admin / $GRAFANA_PASSWORD
📧 Alerts: Configured for Telegram notifications"
    
    echo ""
    info "Monitoring Setup Status:"
    echo "  📊 Prometheus: http://$(hostname -I | awk '{print $1}'):9090"
    echo "  📈 Grafana: http://$(hostname -I | awk '{print $1}'):3000"
    echo "  🚨 Alertmanager: http://$(hostname -I | awk '{print $1}'):9093"
    echo "  📱 Uptime Monitor: Active"
    echo "  🔍 Sentry: Configured"
    
    echo ""
    info "Useful commands:"
    echo "  📋 View logs: docker-compose -f monitoring/docker-compose.monitoring.yml logs -f"
    echo "  🔄 Restart: docker-compose -f monitoring/docker-compose.monitoring.yml restart"
    echo "  🛑 Stop: docker-compose -f monitoring/docker-compose.monitoring.yml down"
    echo "  📊 Status: docker-compose -f monitoring/docker-compose.monitoring.yml ps"
    echo "  🔍 Health: curl http://localhost:9090/-/healthy"
    echo "  📈 Monitor: ./monitoring/uptime/uptime-monitor.sh"
    echo "  🚨 Alerts: curl http://localhost:9093/api/v1/alerts"
    
    echo ""
    warn "Important:"
    echo "  - Configure Sentry DSN in .env file"
    echo "  - Set up Telegram bot token and chat ID"
    echo "  - Review and customize alert rules"
    echo "  - Configure Grafana dashboards"
    echo "  - Test alert notifications"
}

main() {
    log "Starting Sochi Travel monitoring setup"
    
    # Send setup start notification
    send_telegram "📊 *Sochi Travel Monitoring Setup Started*

🔧 Setting up comprehensive monitoring stack
⏰ Started at: $(date)
📦 Components: Prometheus, Grafana, Alertmanager, Sentry, Uptime"
    
    # Set up error handling
    trap 'error "Monitoring setup failed at line $LINENO"' ERR
    
    check_prerequisites
    setup_monitoring_directories
    copy_monitoring_configs
    setup_environment_variables
    setup_sentry
    setup_uptime_monitoring
    start_monitoring_stack
    verify_monitoring_setup
    show_monitoring_status
    
    log "Monitoring setup completed successfully! 🚀"
}

# Run main function
main "$@"
