#!/bin/bash

# Sochi Travel - Uptime Monitoring Script
# Usage: ./scripts/uptime-monitor.sh

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-uptime.log"
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"
CHECK_INTERVAL=60
MAX_RETRIES=3

# URLs to monitor
declare -a MONITOR_URLS=(
    "http://localhost:4000/health"
    "http://localhost/"
    "http://localhost:9000/minio/health/live"
    "http://localhost:9090/-/healthy"
    "http://localhost:3000/api/health"
)

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

check_url() {
    local url="$1"
    local retries=0
    
    while [[ $retries -lt $MAX_RETRIES ]]; do
        if curl -f -s --max-time 10 "$url" >/dev/null 2>&1; then
            return 0
        else
            ((retries++))
            if [[ $retries -lt $MAX_RETRIES ]]; then
                sleep 5
            fi
        fi
    done
    
    return 1
}

check_response_time() {
    local url="$1"
    local response_time=$(curl -o /dev/null -s -w "%{time_total}" --max-time 10 "$url" 2>/dev/null || echo "0")
    echo "$response_time"
}

check_uptime() {
    log "Starting uptime monitoring check..."
    
    local failed_urls=()
    local slow_urls=()
    
    for url in "${MONITOR_URLS[@]}"; do
        info "Checking $url..."
        
        if check_url "$url"; then
            local response_time=$(check_response_time "$url")
            log "✅ $url is up (${response_time}s)"
            
            # Check if response time is too slow (> 5 seconds)
            if (( $(echo "$response_time > 5" | bc -l) )); then
                slow_urls+=("$url (${response_time}s)")
            fi
        else
            error "❌ $url is down"
            failed_urls+=("$url")
        fi
    done
    
    # Send alerts if needed
    if [[ ${#failed_urls[@]} -gt 0 ]]; then
        local failed_list=$(printf '%s\n' "${failed_urls[@]}")
        error "Failed URLs: $failed_list"
        
        send_telegram "🚨 *Uptime Alert - Services Down*

❌ *Failed Services:*
$failed_list

⏰ Time: $(date)
🔧 Action Required: Check service status and logs"
    fi
    
    if [[ ${#slow_urls[@]} -gt 0 ]]; then
        local slow_list=$(printf '%s\n' "${slow_urls[@]}")
        warn "Slow URLs: $slow_list"
        
        send_telegram "⚠️ *Performance Alert - Slow Response*

🐌 *Slow Services:*
$slow_list

⏰ Time: $(date)
🔧 Action Required: Check performance and optimize"
    fi
    
    # Summary
    local total_urls=${#MONITOR_URLS[@]}
    local successful_urls=$((total_urls - ${#failed_urls[@]}))
    local success_rate=$((successful_urls * 100 / total_urls))
    
    info "Uptime check completed: $successful_urls/$total_urls services up ($success_rate%)"
    
    if [[ $success_rate -eq 100 ]]; then
        log "🎉 All services are operational!"
    elif [[ $success_rate -ge 80 ]]; then
        warn "⚠️ Most services are operational ($success_rate%)"
    else
        error "🚨 Critical: Many services are down ($success_rate%)"
    fi
}

check_system_resources() {
    log "Checking system resources..."
    
    # CPU usage
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    local cpu_usage_int=$(echo "$cpu_usage" | cut -d'.' -f1)
    
    if [[ $cpu_usage_int -gt 80 ]]; then
        warn "High CPU usage: ${cpu_usage}%"
        send_telegram "⚠️ *System Alert - High CPU Usage*

🖥️ CPU Usage: ${cpu_usage}%
⏰ Time: $(date)
🔧 Action Required: Check system load and optimize"
    fi
    
    # Memory usage
    local memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
    
    if [[ $memory_usage -gt 85 ]]; then
        warn "High memory usage: ${memory_usage}%"
        send_telegram "⚠️ *System Alert - High Memory Usage*

🧠 Memory Usage: ${memory_usage}%
⏰ Time: $(date)
🔧 Action Required: Check memory usage and optimize"
    fi
    
    # Disk usage
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [[ $disk_usage -gt 90 ]]; then
        error "High disk usage: ${disk_usage}%"
        send_telegram "🚨 *Critical Alert - High Disk Usage*

💾 Disk Usage: ${disk_usage}%
⏰ Time: $(date)
🔧 Action Required: Free up disk space immediately"
    fi
    
    info "System resources: CPU ${cpu_usage}%, Memory ${memory_usage}%, Disk ${disk_usage}%"
}

check_docker_services() {
    log "Checking Docker services..."
    
    cd "$PROJECT_DIR"
    
    if [[ ! -f "docker-compose.prod.yml" ]]; then
        error "Docker Compose file not found"
        return 1
    fi
    
    local services=$(docker-compose -f docker-compose.prod.yml ps --services)
    local failed_services=()
    
    for service in $services; do
        local status=$(docker-compose -f docker-compose.prod.yml ps "$service" | grep "$service" | awk '{print $3}')
        
        if [[ "$status" == "Up" ]]; then
            info "✅ Service $service is running"
        else
            error "❌ Service $service is not running (Status: $status)"
            failed_services+=("$service")
        fi
    done
    
    if [[ ${#failed_services[@]} -gt 0 ]]; then
        local failed_list=$(printf '%s\n' "${failed_services[@]}")
        error "Failed Docker services: $failed_list"
        
        send_telegram "🚨 *Docker Alert - Services Down*

🐳 *Failed Services:*
$failed_list

⏰ Time: $(date)
🔧 Action Required: Check Docker logs and restart services"
    fi
}

generate_uptime_report() {
    log "Generating uptime report..."
    
    local report_file="/tmp/sochi-travel-uptime-report-$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "=== Sochi Travel Uptime Report ==="
        echo "Generated: $(date)"
        echo ""
        
        echo "=== System Resources ==="
        echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
        echo "Memory Usage: $(free | grep Mem | awk '{printf "%.0f%%", $3/$2 * 100.0}')"
        echo "Disk Usage: $(df / | awk 'NR==2 {print $5}')"
        echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
        echo ""
        
        echo "=== Service Status ==="
        cd "$PROJECT_DIR"
        docker-compose -f docker-compose.prod.yml ps
        echo ""
        
        echo "=== Uptime Check Results ==="
        for url in "${MONITOR_URLS[@]}"; do
            if check_url "$url"; then
                local response_time=$(check_response_time "$url")
                echo "✅ $url - UP (${response_time}s)"
            else
                echo "❌ $url - DOWN"
            fi
        done
        echo ""
        
        echo "=== Recent Logs ==="
        tail -20 "$LOG_FILE"
        echo ""
        
    } > "$report_file"
    
    log "Uptime report generated: $report_file"
    
    # Send report via Telegram if enabled
    if [[ -n "$TELEGRAM_BOT_TOKEN" && -n "$TELEGRAM_CHAT_ID" ]]; then
        send_telegram "📊 *Sochi Travel Uptime Report*

📄 Report generated: $(date)
📁 Location: $report_file
📊 System Status: $(systemctl is-active sochi-travel)
🔧 Services: $(docker-compose -f $PROJECT_DIR/docker-compose.prod.yml ps --services | wc -l) running"
    fi
}

show_uptime_status() {
    log "Uptime monitoring completed! 📊"
    
    echo ""
    info "Uptime Status Summary:"
    echo "  🖥️ System: $(hostname)"
    echo "  ⏰ Time: $(date)"
    echo "  📊 CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
    echo "  🧠 Memory: $(free | grep Mem | awk '{printf "%.0f%%", $3/$2 * 100.0}')"
    echo "  💾 Disk: $(df / | awk 'NR==2 {print $5}')"
    echo "  🔄 Load: $(uptime | awk -F'load average:' '{print $2}')"
    
    echo ""
    info "Service Status:"
    cd "$PROJECT_DIR"
    docker-compose -f docker-compose.prod.yml ps
    
    echo ""
    info "Useful commands:"
    echo "  📋 View logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "  🔄 Restart: docker-compose -f docker-compose.prod.yml restart"
    echo "  📊 Status: docker-compose -f docker-compose.prod.yml ps"
    echo "  🔍 Health: curl http://localhost:4000/health"
    echo "  📈 Monitor: htop"
    echo "  🛡️ Security: ufw status verbose"
}

main() {
    log "Starting Sochi Travel uptime monitoring"
    
    check_uptime
    check_system_resources
    check_docker_services
    generate_uptime_report
    show_uptime_status
    
    log "Uptime monitoring completed successfully! 📊"
}

# Run main function
main "$@"
