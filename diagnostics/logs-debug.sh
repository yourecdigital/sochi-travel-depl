#!/bin/bash

# Sochi Travel - Application Logs Debug Script
# Usage: ./diagnostics/logs-debug.sh [--verbose] [--follow] [--service=api]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-logs-debug.log"
REPORT_FILE="/tmp/logs-debug-$(date +%Y%m%d_%H%M%S).txt"

# Parse arguments
VERBOSE=false
FOLLOW=false
SERVICE=""
SINCE="1h"

while [[ $# -gt 0 ]]; do
    case $1 in
        --verbose)
            VERBOSE=true
            shift
            ;;
        --follow)
            FOLLOW=true
            shift
            ;;
        --service=*)
            SERVICE="${1#*=}"
            shift
            ;;
        --since=*)
            SINCE="${1#*=}"
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

check_log_files() {
    log "Checking log files and locations..."
    
    # System logs
    local system_logs=(
        "/var/log/syslog"
        "/var/log/auth.log"
        "/var/log/kern.log"
        "/var/log/dpkg.log"
    )
    
    for log_file in "${system_logs[@]}"; do
        if [[ -f "$log_file" ]]; then
            local size=$(du -h "$log_file" | cut -f1)
            local lines=$(wc -l < "$log_file")
            info "System log: $log_file (${size}, ${lines} lines)"
        else
            warn "System log not found: $log_file"
        fi
    done
    
    # Application logs
    local app_logs=(
        "/var/log/nginx/access.log"
        "/var/log/nginx/error.log"
        "/var/log/mysql/error.log"
        "/var/log/redis/redis-server.log"
    )
    
    for log_file in "${app_logs[@]}"; do
        if [[ -f "$log_file" ]]; then
            local size=$(du -h "$log_file" | cut -f1)
            local lines=$(wc -l < "$log_file")
            info "Application log: $log_file (${size}, ${lines} lines)"
        else
            warn "Application log not found: $log_file"
        fi
    done
}

analyze_docker_logs() {
    log "Analyzing Docker container logs..."
    
    cd "$PROJECT_DIR"
    
    if [[ -n "$SERVICE" ]]; then
        analyze_service_logs "$SERVICE"
    else
        # Analyze all services
        local services=$(docker-compose -f docker-compose.prod.yml ps --services)
        
        for service in $services; do
            analyze_service_logs "$service"
        done
    fi
}

analyze_service_logs() {
    local service="$1"
    local container_name="sochi-travel-${service}-prod"
    
    log "Analyzing logs for service: $service"
    
    if ! docker ps --format "{{.Names}}" | grep -q "$container_name"; then
        warn "Container $container_name is not running"
        return 1
    fi
    
    # Get log statistics
    local total_lines=$(docker logs "$container_name" 2>&1 | wc -l)
    local error_count=$(docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "error\|exception\|fatal\|panic" | wc -l)
    local warning_count=$(docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "warning\|warn" | wc -l)
    local info_count=$(docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "info" | wc -l)
    
    info "Log Statistics for $service:"
    echo "  Total log lines: $total_lines"
    echo "  Errors (last $SINCE): $error_count"
    echo "  Warnings (last $SINCE): $warning_count"
    echo "  Info messages (last $SINCE): $info_count"
    
    # Show recent errors
    if [[ $error_count -gt 0 ]]; then
        warn "Recent errors in $service:"
        docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "error\|exception\|fatal\|panic" | tail -5
    else
        log "✅ No recent errors in $service"
    fi
    
    # Show recent warnings
    if [[ $warning_count -gt 0 ]]; then
        warn "Recent warnings in $service:"
        docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "warning\|warn" | tail -3
    fi
}

check_nginx_logs() {
    log "Checking Nginx logs..."
    
    local nginx_logs=(
        "/var/log/nginx/access.log"
        "/var/log/nginx/error.log"
    )
    
    for log_file in "${nginx_logs[@]}"; do
        if [[ -f "$log_file" ]]; then
            info "Analyzing $log_file..."
            
            # Analyze access logs
            if [[ "$log_file" == *"access.log"* ]]; then
                local total_requests=$(wc -l < "$log_file")
                local error_requests=$(grep -c " [45][0-9][0-9] " "$log_file" || echo "0")
                local unique_ips=$(awk '{print $1}' "$log_file" | sort | uniq | wc -l)
                
                info "Nginx Access Log Analysis:"
                echo "  Total requests: $total_requests"
                echo "  Error requests: $error_requests"
                echo "  Unique IPs: $unique_ips"
                
                # Show top IPs
                info "Top 5 IP addresses:"
                awk '{print $1}' "$log_file" | sort | uniq -c | sort -nr | head -5
                
                # Show recent errors
                if [[ $error_requests -gt 0 ]]; then
                    warn "Recent error requests:"
                    grep " [45][0-9][0-9] " "$log_file" | tail -5
                fi
            fi
            
            # Analyze error logs
            if [[ "$log_file" == *"error.log"* ]]; then
                local error_count=$(wc -l < "$log_file")
                if [[ $error_count -gt 0 ]]; then
                    warn "Nginx Error Log Analysis:"
                    echo "  Total errors: $error_count"
                    echo "  Recent errors:"
                    tail -5 "$log_file"
                else
                    log "✅ No errors in Nginx error log"
                fi
            fi
        else
            warn "Nginx log not found: $log_file"
        fi
    done
}

check_database_logs() {
    log "Checking database logs..."
    
    cd "$PROJECT_DIR"
    
    # MariaDB logs
    local mariadb_errors=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" mariadb 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    local mariadb_warnings=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" mariadb 2>&1 | grep -i "warning" | wc -l)
    
    info "MariaDB Log Analysis:"
    echo "  Errors (last $SINCE): $mariadb_errors"
    echo "  Warnings (last $SINCE): $mariadb_warnings"
    
    if [[ $mariadb_errors -gt 0 ]]; then
        warn "Recent MariaDB errors:"
        docker-compose -f docker-compose.prod.yml logs --since="$SINCE" mariadb 2>&1 | grep -i "error\|exception\|fatal" | tail -3
    fi
    
    # Redis logs
    local redis_errors=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" redis 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    local redis_warnings=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" redis 2>&1 | grep -i "warning" | wc -l)
    
    info "Redis Log Analysis:"
    echo "  Errors (last $SINCE): $redis_errors"
    echo "  Warnings (last $SINCE): $redis_warnings"
    
    if [[ $redis_errors -gt 0 ]]; then
        warn "Recent Redis errors:"
        docker-compose -f docker-compose.prod.yml logs --since="$SINCE" redis 2>&1 | grep -i "error\|exception\|fatal" | tail -3
    fi
}

check_application_logs() {
    log "Checking application logs..."
    
    cd "$PROJECT_DIR"
    
    # API logs
    local api_errors=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" api 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    local api_warnings=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" api 2>&1 | grep -i "warning" | wc -l)
    
    info "API Log Analysis:"
    echo "  Errors (last $SINCE): $api_errors"
    echo "  Warnings (last $SINCE): $api_warnings"
    
    if [[ $api_errors -gt 0 ]]; then
        warn "Recent API errors:"
        docker-compose -f docker-compose.prod.yml logs --since="$SINCE" api 2>&1 | grep -i "error\|exception\|fatal" | tail -5
    fi
    
    # Web logs
    local web_errors=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" web 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    local web_warnings=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" web 2>&1 | grep -i "warning" | wc -l)
    
    info "Web Log Analysis:"
    echo "  Errors (last $SINCE): $web_errors"
    echo "  Warnings (last $SINCE): $web_warnings"
    
    if [[ $web_errors -gt 0 ]]; then
        warn "Recent Web errors:"
        docker-compose -f docker-compose.prod.yml logs --since="$SINCE" web 2>&1 | grep -i "error\|exception\|fatal" | tail -5
    fi
}

check_system_logs() {
    log "Checking system logs..."
    
    # Check systemd logs
    local systemd_services=(
        "sochi-travel"
        "sochi-travel-backup"
        "sochi-travel-uptime"
        "docker"
        "nginx"
        "mysql"
    )
    
    for service in "${systemd_services[@]}"; do
        if systemctl is-active --quiet "$service" 2>/dev/null; then
            local status=$(systemctl is-active "$service")
            local errors=$(journalctl -u "$service" --since="$SINCE" --no-pager | grep -i "error\|exception\|fatal" | wc -l)
            
            info "Systemd service $service: $status (errors: $errors)"
            
            if [[ $errors -gt 0 ]]; then
                warn "Recent errors in $service:"
                journalctl -u "$service" --since="$SINCE" --no-pager | grep -i "error\|exception\|fatal" | tail -3
            fi
        else
            warn "Systemd service $service is not active"
        fi
    done
}

follow_logs() {
    log "Following logs in real-time..."
    
    cd "$PROJECT_DIR"
    
    if [[ -n "$SERVICE" ]]; then
        info "Following logs for service: $service"
        docker-compose -f docker-compose.prod.yml logs -f "$SERVICE"
    else
        info "Following logs for all services..."
        docker-compose -f docker-compose.prod.yml logs -f
    fi
}

search_logs() {
    log "Searching logs for specific patterns..."
    
    cd "$PROJECT_DIR"
    
    local search_patterns=(
        "error"
        "exception"
        "fatal"
        "panic"
        "timeout"
        "connection refused"
        "permission denied"
        "out of memory"
    )
    
    for pattern in "${search_patterns[@]}"; do
        info "Searching for pattern: $pattern"
        
        local matches=$(docker-compose -f docker-compose.prod.yml logs --since="$SINCE" 2>&1 | grep -i "$pattern" | wc -l)
        
        if [[ $matches -gt 0 ]]; then
            warn "Found $matches matches for '$pattern':"
            docker-compose -f docker-compose.prod.yml logs --since="$SINCE" 2>&1 | grep -i "$pattern" | tail -3
        else
            log "✅ No matches found for '$pattern'"
        fi
    done
}

generate_logs_report() {
    log "Generating logs debug report..."
    
    {
        echo "=== SOCHI TRAVEL LOGS DEBUG REPORT ==="
        echo "Generated: $(date)"
        echo "Analysis Period: $SINCE"
        echo ""
        
        echo "=== SYSTEM LOGS ==="
        echo "System log size: $(du -h /var/log/syslog 2>/dev/null | cut -f1 || echo "N/A")"
        echo "Auth log size: $(du -h /var/log/auth.log 2>/dev/null | cut -f1 || echo "N/A")"
        echo ""
        
        echo "=== APPLICATION LOGS ==="
        echo "Nginx access log size: $(du -h /var/log/nginx/access.log 2>/dev/null | cut -f1 || echo "N/A")"
        echo "Nginx error log size: $(du -h /var/log/nginx/error.log 2>/dev/null | cut -f1 || echo "N/A")"
        echo ""
        
        echo "=== DOCKER LOGS SUMMARY ==="
        cd "$PROJECT_DIR"
        for service in $(docker-compose -f docker-compose.prod.yml ps --services); do
            local container_name="sochi-travel-${service}-prod"
            if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
                local errors=$(docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
                local warnings=$(docker logs --since="$SINCE" "$container_name" 2>&1 | grep -i "warning" | wc -l)
                echo "$service: $errors errors, $warnings warnings"
            fi
        done
        echo ""
        
        echo "=== RECENT ERRORS ==="
        docker-compose -f docker-compose.prod.yml logs --since="$SINCE" 2>&1 | grep -i "error\|exception\|fatal" | tail -10
        
    } > "$REPORT_FILE"
    
    log "Logs debug report generated: $REPORT_FILE"
}

show_log_commands() {
    log "Useful log commands:"
    
    echo ""
    echo "📋 USEFUL LOG COMMANDS:"
    echo ""
    echo "1. Follow all logs:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f"
    echo ""
    echo "2. Follow specific service:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f api"
    echo "   docker-compose -f docker-compose.prod.yml logs -f web"
    echo "   docker-compose -f docker-compose.prod.yml logs -f mariadb"
    echo ""
    echo "3. Search for errors:"
    echo "   docker-compose -f docker-compose.prod.yml logs | grep -i error"
    echo "   docker-compose -f docker-compose.prod.yml logs | grep -i exception"
    echo ""
    echo "4. View recent logs:"
    echo "   docker-compose -f docker-compose.prod.yml logs --since=1h"
    echo "   docker-compose -f docker-compose.prod.yml logs --since=1d"
    echo ""
    echo "5. System logs:"
    echo "   journalctl -u sochi-travel -f"
    echo "   tail -f /var/log/nginx/error.log"
    echo "   tail -f /var/log/syslog"
    echo ""
    echo "6. Log analysis:"
    echo "   docker-compose -f docker-compose.prod.yml logs | grep -c error"
    echo "   docker-compose -f docker-compose.prod.yml logs | grep -c warning"
}

main() {
    log "Starting Sochi Travel logs debug"
    
    {
        echo "SOCHI TRAVEL LOGS DEBUG"
        echo "======================="
        echo "Started: $(date)"
        echo "Analysis Period: $SINCE"
        echo ""
        
    } > "$REPORT_FILE"
    
    check_log_files
    analyze_docker_logs
    check_nginx_logs
    check_database_logs
    check_application_logs
    check_system_logs
    search_logs
    generate_logs_report
    show_log_commands
    
    if [[ "$FOLLOW" == "true" ]]; then
        follow_logs
    fi
    
    log "Logs debug completed! 📋"
    
    echo ""
    info "Logs Debug Summary:"
    echo "  📊 Report: $REPORT_FILE"
    echo "  📋 Logs: $LOG_FILE"
    echo "  🔍 Service: ${SERVICE:-all}"
    echo "  ⏰ Since: $SINCE"
    echo "  📝 Verbose: $VERBOSE"
    echo "  👀 Follow: $FOLLOW"
}

main "$@"
