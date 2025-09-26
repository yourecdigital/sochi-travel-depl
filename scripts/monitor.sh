#!/bin/bash

# Sochi Travel - System Monitoring Script
# Usage: ./scripts/monitor.sh [--alert] [--report] [--check-all]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
COMPOSE_FILE="docker-compose.prod.yml"
LOG_FILE="/var/log/sochi-travel-monitor.log"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"
ALERT_THRESHOLD_CPU=80
ALERT_THRESHOLD_MEMORY=85
ALERT_THRESHOLD_DISK=90

# Parse arguments
SEND_ALERTS=false
GENERATE_REPORT=false
CHECK_ALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --alert)
            SEND_ALERTS=true
            shift
            ;;
        --report)
            GENERATE_REPORT=true
            shift
            ;;
        --check-all)
            CHECK_ALL=true
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

check_system_resources() {
    log "Checking system resources..."
    
    # CPU usage
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    local cpu_usage_int=$(echo "$cpu_usage" | cut -d'.' -f1)
    
    if [[ $cpu_usage_int -gt $ALERT_THRESHOLD_CPU ]]; then
        warn "High CPU usage: ${cpu_usage}%"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *High CPU Usage Alert*

🖥️ CPU Usage: ${cpu_usage}%
📊 Threshold: ${ALERT_THRESHOLD_CPU}%
⏰ Time: $(date)"
        fi
    else
        info "CPU usage: ${cpu_usage}%"
    fi
    
    # Memory usage
    local memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
    
    if [[ $memory_usage -gt $ALERT_THRESHOLD_MEMORY ]]; then
        warn "High memory usage: ${memory_usage}%"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *High Memory Usage Alert*

🧠 Memory Usage: ${memory_usage}%
📊 Threshold: ${ALERT_THRESHOLD_MEMORY}%
⏰ Time: $(date)"
        fi
    else
        info "Memory usage: ${memory_usage}%"
    fi
    
    # Disk usage
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [[ $disk_usage -gt $ALERT_THRESHOLD_DISK ]]; then
        warn "High disk usage: ${disk_usage}%"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *High Disk Usage Alert*

💾 Disk Usage: ${disk_usage}%
📊 Threshold: ${ALERT_THRESHOLD_DISK}%
⏰ Time: $(date)"
        fi
    else
        info "Disk usage: ${disk_usage}%"
    fi
    
    # Load average
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    local cpu_cores=$(nproc)
    local load_threshold=$(echo "$cpu_cores * 2" | bc)
    
    if (( $(echo "$load_avg > $load_threshold" | bc -l) )); then
        warn "High load average: $load_avg (cores: $cpu_cores)"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *High Load Average Alert*

⚡ Load Average: $load_avg
🖥️ CPU Cores: $cpu_cores
📊 Threshold: $load_threshold
⏰ Time: $(date)"
        fi
    else
        info "Load average: $load_avg (cores: $cpu_cores)"
    fi
}

check_docker_services() {
    log "Checking Docker services..."
    
    cd "$PROJECT_DIR"
    
    # Check if docker-compose file exists
    if [[ ! -f "$COMPOSE_FILE" ]]; then
        error "Docker Compose file not found: $COMPOSE_FILE"
    fi
    
    # Get service status
    local services=$(docker-compose -f "$COMPOSE_FILE" ps --services)
    local failed_services=()
    
    for service in $services; do
        local status=$(docker-compose -f "$COMPOSE_FILE" ps "$service" | grep "$service" | awk '{print $3}')
        
        if [[ "$status" == "Up" ]]; then
            info "✅ Service $service is running"
        else
            warn "❌ Service $service is not running (Status: $status)"
            failed_services+=("$service")
        fi
    done
    
    # Check for failed services
    if [[ ${#failed_services[@]} -gt 0 ]]; then
        error "Failed services: ${failed_services[*]}"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Docker Services Alert*

❌ Failed Services: ${failed_services[*]}
⏰ Time: $(date)
🔧 Action Required: Check service logs and restart if needed"
        fi
    fi
}

check_application_health() {
    log "Checking application health..."
    
    # Check API health
    if curl -f http://localhost:4000/health &> /dev/null; then
        info "✅ API is healthy"
    else
        warn "❌ API health check failed"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *API Health Alert*

❌ API health check failed
🔗 URL: http://localhost:4000/health
⏰ Time: $(date)
🔧 Action Required: Check API logs and restart if needed"
        fi
    fi
    
    # Check web health
    if curl -f http://localhost/ &> /dev/null; then
        info "✅ Web application is healthy"
    else
        warn "❌ Web application health check failed"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Web Application Alert*

❌ Web application health check failed
🔗 URL: http://localhost/
⏰ Time: $(date)
🔧 Action Required: Check web logs and restart if needed"
        fi
    fi
    
    # Check database connection
    cd "$PROJECT_DIR"
    if docker-compose -f "$COMPOSE_FILE" exec -T mariadb mysqladmin ping &> /dev/null; then
        info "✅ Database is healthy"
    else
        warn "❌ Database health check failed"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Database Alert*

❌ Database health check failed
🗄️ Service: MariaDB
⏰ Time: $(date)
🔧 Action Required: Check database logs and restart if needed"
        fi
    fi
    
    # Check Redis connection
    if docker-compose -f "$COMPOSE_FILE" exec -T redis redis-cli ping &> /dev/null; then
        info "✅ Redis is healthy"
    else
        warn "❌ Redis health check failed"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Redis Alert*

❌ Redis health check failed
🔴 Service: Redis
⏰ Time: $(date)
🔧 Action Required: Check Redis logs and restart if needed"
        fi
    fi
    
    # Check MinIO connection
    if curl -f http://localhost:9000/minio/health/live &> /dev/null; then
        info "✅ MinIO is healthy"
    else
        warn "❌ MinIO health check failed"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *MinIO Alert*

❌ MinIO health check failed
📦 Service: MinIO
⏰ Time: $(date)
🔧 Action Required: Check MinIO logs and restart if needed"
        fi
    fi
}

check_logs() {
    log "Checking application logs for errors..."
    
    cd "$PROJECT_DIR"
    
    # Check for error logs in the last hour
    local error_count=$(docker-compose -f "$COMPOSE_FILE" logs --since=1h 2>&1 | grep -i error | wc -l)
    
    if [[ $error_count -gt 10 ]]; then
        warn "High number of errors in logs: $error_count"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *High Error Rate Alert*

📊 Error Count: $error_count (last hour)
⏰ Time: $(date)
🔧 Action Required: Check application logs for issues"
        fi
    else
        info "Error count in logs: $error_count (last hour)"
    fi
    
    # Check for critical errors
    local critical_errors=$(docker-compose -f "$COMPOSE_FILE" logs --since=1h 2>&1 | grep -i "critical\|fatal\|panic" | wc -l)
    
    if [[ $critical_errors -gt 0 ]]; then
        error "Critical errors found: $critical_errors"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Critical Error Alert*

💥 Critical Errors: $critical_errors
⏰ Time: $(date)
🔧 Action Required: Immediate attention required"
        fi
    fi
}

check_network() {
    log "Checking network connectivity..."
    
    # Check internet connectivity
    if ping -c 1 8.8.8.8 &> /dev/null; then
        info "✅ Internet connectivity is working"
    else
        warn "❌ Internet connectivity issues"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Network Alert*

🌐 Internet connectivity issues
⏰ Time: $(date)
🔧 Action Required: Check network configuration"
        fi
    fi
    
    # Check DNS resolution
    if nslookup google.com &> /dev/null; then
        info "✅ DNS resolution is working"
    else
        warn "❌ DNS resolution issues"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *DNS Alert*

🔍 DNS resolution issues
⏰ Time: $(date)
🔧 Action Required: Check DNS configuration"
        fi
    fi
}

check_security() {
    log "Checking security status..."
    
    # Check UFW status
    local ufw_status=$(ufw status | grep "Status:" | awk '{print $2}')
    if [[ "$ufw_status" == "active" ]]; then
        info "✅ UFW firewall is active"
    else
        warn "❌ UFW firewall is not active"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *Security Alert*

🛡️ UFW firewall is not active
⏰ Time: $(date)
🔧 Action Required: Enable UFW firewall"
        fi
    fi
    
    # Check fail2ban status
    if systemctl is-active --quiet fail2ban; then
        info "✅ Fail2ban is running"
    else
        warn "❌ Fail2ban is not running"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "⚠️ *Security Alert*

🚫 Fail2ban is not running
⏰ Time: $(date)
🔧 Action Required: Start fail2ban service"
        fi
    fi
    
    # Check for failed SSH attempts
    local failed_ssh=$(grep "Failed password" /var/log/auth.log 2>/dev/null | wc -l)
    if [[ $failed_ssh -gt 10 ]]; then
        warn "High number of failed SSH attempts: $failed_ssh"
        if [[ "$SEND_ALERTS" == "true" ]]; then
            send_telegram "🚨 *Security Alert*

🔐 High number of failed SSH attempts: $failed_ssh
⏰ Time: $(date)
🔧 Action Required: Check for brute force attacks"
        fi
    fi
}

generate_report() {
    if [[ "$GENERATE_REPORT" != "true" ]]; then
        return
    fi
    
    log "Generating monitoring report..."
    
    local report_file="/tmp/sochi-travel-monitor-report-$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "=== Sochi Travel Monitoring Report ==="
        echo "Generated: $(date)"
        echo ""
        
        echo "=== System Resources ==="
        echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
        echo "Memory Usage: $(free | grep Mem | awk '{printf "%.0f%%", $3/$2 * 100.0}')"
        echo "Disk Usage: $(df / | awk 'NR==2 {print $5}')"
        echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
        echo ""
        
        echo "=== Docker Services ==="
        cd "$PROJECT_DIR"
        docker-compose -f "$COMPOSE_FILE" ps
        echo ""
        
        echo "=== Application Health ==="
        echo "API Health: $(curl -s http://localhost:4000/health || echo "Failed")"
        echo "Web Health: $(curl -s -o /dev/null -w "%{http_code}" http://localhost/ || echo "Failed")"
        echo ""
        
        echo "=== Recent Logs (last 10 lines) ==="
        docker-compose -f "$COMPOSE_FILE" logs --tail=10
        echo ""
        
        echo "=== Security Status ==="
        echo "UFW Status: $(ufw status | grep "Status:" | awk '{print $2}')"
        echo "Fail2ban Status: $(systemctl is-active fail2ban)"
        echo ""
        
    } > "$report_file"
    
    log "Monitoring report generated: $report_file"
    
    # Send report via Telegram if enabled
    if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
        send_telegram "📊 *Sochi Travel Monitoring Report*

📄 Report generated: $(date)
📁 Location: $report_file
📊 System Status: $(systemctl is-active sochi-travel)
🔧 Services: $(docker-compose -f $PROJECT_DIR/$COMPOSE_FILE ps --services | wc -l) running"
    fi
}

show_monitoring_status() {
    log "Monitoring completed successfully! 📊"
    
    echo ""
    info "Monitoring Summary:"
    echo "  🖥️ System: $(hostname)"
    echo "  ⏰ Time: $(date)"
    echo "  📊 CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
    echo "  🧠 Memory: $(free | grep Mem | awk '{printf "%.0f%%", $3/$2 * 100.0}')"
    echo "  💾 Disk: $(df / | awk 'NR==2 {print $5}')"
    echo "  🔄 Load: $(uptime | awk -F'load average:' '{print $2}')"
    
    echo ""
    info "Application Status:"
    cd "$PROJECT_DIR"
    docker-compose -f "$COMPOSE_FILE" ps
    
    echo ""
    info "Useful commands:"
    echo "  📋 View logs: docker-compose -f $COMPOSE_FILE logs -f"
    echo "  🔄 Restart: docker-compose -f $COMPOSE_FILE restart"
    echo "  📊 Status: docker-compose -f $COMPOSE_FILE ps"
    echo "  🔍 Health: curl http://localhost:4000/health"
    echo "  📈 Monitor: htop"
    echo "  🛡️ Security: ufw status verbose"
}

main() {
    log "Starting Sochi Travel monitoring"
    
    check_system_resources
    check_docker_services
    check_application_health
    check_logs
    check_network
    check_security
    generate_report
    show_monitoring_status
    
    log "Monitoring completed successfully! 📊"
}

# Run main function
main "$@"
