#!/bin/bash

# Sochi Travel - Performance Analysis Script
# Usage: ./diagnostics/performance-analysis.sh [--verbose] [--duration=300]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-performance.log"
REPORT_FILE="/tmp/performance-analysis-$(date +%Y%m%d_%H%M%S).txt"
DURATION=300  # 5 minutes default

# Parse arguments
VERBOSE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --verbose)
            VERBOSE=true
            shift
            ;;
        --duration=*)
            DURATION="${1#*=}"
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

check_system_resources() {
    log "Analyzing system resources..."
    
    # CPU usage
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    local cpu_cores=$(nproc)
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    
    info "CPU Analysis:"
    echo "  CPU Usage: ${cpu_usage}%"
    echo "  CPU Cores: $cpu_cores"
    echo "  Load Average: $load_avg"
    
    # Check CPU performance
    if (( $(echo "$cpu_usage > 80" | bc -l) )); then
        warn "⚠️ High CPU usage: ${cpu_usage}%"
    else
        log "✅ CPU usage: ${cpu_usage}%"
    fi
    
    # Check load average
    local load_threshold=$(echo "$cpu_cores * 2" | bc)
    if (( $(echo "$load_avg > $load_threshold" | bc -l) )); then
        warn "⚠️ High load average: $load_avg (threshold: $load_threshold)"
    else
        log "✅ Load average: $load_avg"
    fi
    
    # Memory usage
    local memory_info=$(free -m)
    local total_memory=$(echo "$memory_info" | awk 'NR==2{print $2}')
    local used_memory=$(echo "$memory_info" | awk 'NR==2{print $3}')
    local available_memory=$(echo "$memory_info" | awk 'NR==2{print $7}')
    local memory_usage_percent=$((used_memory * 100 / total_memory))
    
    info "Memory Analysis:"
    echo "  Total Memory: ${total_memory}MB"
    echo "  Used Memory: ${used_memory}MB"
    echo "  Available Memory: ${available_memory}MB"
    echo "  Memory Usage: ${memory_usage_percent}%"
    
    if [[ $memory_usage_percent -gt 85 ]]; then
        warn "⚠️ High memory usage: ${memory_usage_percent}%"
    else
        log "✅ Memory usage: ${memory_usage_percent}%"
    fi
    
    # Disk usage
    local disk_info=$(df -h /)
    local disk_usage=$(echo "$disk_info" | awk 'NR==2{print $5}' | sed 's/%//')
    local disk_available=$(echo "$disk_info" | awk 'NR==2{print $4}')
    
    info "Disk Analysis:"
    echo "  Disk Usage: ${disk_usage}%"
    echo "  Available Space: $disk_available"
    
    if [[ $disk_usage -gt 90 ]]; then
        warn "⚠️ High disk usage: ${disk_usage}%"
    else
        log "✅ Disk usage: ${disk_usage}%"
    fi
}

check_container_performance() {
    log "Analyzing container performance..."
    
    cd "$PROJECT_DIR"
    
    # Get container stats
    local containers=$(docker ps --format "{{.Names}}" | grep sochi-travel)
    
    for container in $containers; do
        info "Container: $container"
        
        # Get container stats
        local stats=$(docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}" "$container")
        echo "$stats"
        
        # Analyze performance
        local cpu_usage=$(docker stats --no-stream --format "{{.CPUPerc}}" "$container" | sed 's/%//')
        local mem_usage=$(docker stats --no-stream --format "{{.MemPerc}}" "$container" | sed 's/%//')
        
        if (( $(echo "$cpu_usage > 80" | bc -l) )); then
            warn "⚠️ Container $container has high CPU usage: ${cpu_usage}%"
        fi
        
        if (( $(echo "$mem_usage > 80" | bc -l) )); then
            warn "⚠️ Container $container has high memory usage: ${mem_usage}%"
        fi
        
        # Check container health
        local health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "unknown")
        if [[ "$health" == "unhealthy" ]]; then
            warn "⚠️ Container $container is unhealthy"
        elif [[ "$health" == "healthy" ]]; then
            log "✅ Container $container is healthy"
        fi
    done
}

check_application_performance() {
    log "Analyzing application performance..."
    
    # Test API response time
    local api_response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:4000/health 2>/dev/null || echo "0")
    if [[ "$api_response_time" != "0" ]]; then
        info "API Response Time: ${api_response_time}s"
        
        if (( $(echo "$api_response_time > 2" | bc -l) )); then
            warn "⚠️ Slow API response time: ${api_response_time}s"
        else
            log "✅ API response time: ${api_response_time}s"
        fi
    else
        warn "⚠️ API not responding"
    fi
    
    # Test web response time
    local web_response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost/ 2>/dev/null || echo "0")
    if [[ "$web_response_time" != "0" ]]; then
        info "Web Response Time: ${web_response_time}s"
        
        if (( $(echo "$web_response_time > 3" | bc -l) )); then
            warn "⚠️ Slow web response time: ${web_response_time}s"
        else
            log "✅ Web response time: ${web_response_time}s"
        fi
    else
        warn "⚠️ Web not responding"
    fi
    
    # Test database response time
    cd "$PROJECT_DIR"
    local db_response_time=$(time docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SELECT 1;" 2>&1 | grep real | awk '{print $2}' | sed 's/[^0-9.]//g' || echo "0")
    if [[ "$db_response_time" != "0" ]]; then
        info "Database Response Time: ${db_response_time}s"
        
        if (( $(echo "$db_response_time > 1" | bc -l) )); then
            warn "⚠️ Slow database response time: ${db_response_time}s"
        else
            log "✅ Database response time: ${db_response_time}s"
        fi
    else
        warn "⚠️ Database not responding"
    fi
}

monitor_performance() {
    log "Monitoring performance for ${DURATION} seconds..."
    
    local start_time=$(date +%s)
    local end_time=$((start_time + DURATION))
    
    info "Performance monitoring started at $(date)"
    info "Monitoring duration: ${DURATION} seconds"
    
    # Create monitoring data file
    local monitor_file="/tmp/performance-monitor-$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "timestamp,cpu_usage,memory_usage,disk_usage,api_response_time,web_response_time"
    } > "$monitor_file"
    
    while [[ $(date +%s) -lt $end_time ]]; do
        local current_time=$(date +%s)
        local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        
        # Get system metrics
        local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
        local memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
        local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
        
        # Get application metrics
        local api_response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:4000/health 2>/dev/null || echo "0")
        local web_response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost/ 2>/dev/null || echo "0")
        
        # Record metrics
        echo "$timestamp,$cpu_usage,$memory_usage,$disk_usage,$api_response_time,$web_response_time" >> "$monitor_file"
        
        # Show progress
        local elapsed=$((current_time - start_time))
        local remaining=$((DURATION - elapsed))
        echo -ne "\rMonitoring... ${elapsed}s/${DURATION}s (${remaining}s remaining)"
        
        sleep 10
    done
    
    echo ""
    log "Performance monitoring completed"
    
    # Analyze monitoring data
    analyze_monitoring_data "$monitor_file"
}

analyze_monitoring_data() {
    local monitor_file="$1"
    
    log "Analyzing monitoring data..."
    
    if [[ ! -f "$monitor_file" ]]; then
        error "Monitoring data file not found"
        return 1
    fi
    
    # Calculate averages
    local avg_cpu=$(tail -n +2 "$monitor_file" | awk -F',' '{sum+=$2; count++} END {if(count>0) print sum/count; else print 0}')
    local avg_memory=$(tail -n +2 "$monitor_file" | awk -F',' '{sum+=$3; count++} END {if(count>0) print sum/count; else print 0}')
    local avg_disk=$(tail -n +2 "$monitor_file" | awk -F',' '{sum+=$4; count++} END {if(count>0) print sum/count; else print 0}')
    local avg_api=$(tail -n +2 "$monitor_file" | awk -F',' '{sum+=$5; count++} END {if(count>0) print sum/count; else print 0}')
    local avg_web=$(tail -n +2 "$monitor_file" | awk -F',' '{sum+=$6; count++} END {if(count>0) print sum/count; else print 0}')
    
    info "Performance Averages:"
    echo "  CPU Usage: ${avg_cpu}%"
    echo "  Memory Usage: ${avg_memory}%"
    echo "  Disk Usage: ${avg_disk}%"
    echo "  API Response Time: ${avg_api}s"
    echo "  Web Response Time: ${avg_web}s"
    
    # Check for performance issues
    local issues=0
    
    if (( $(echo "$avg_cpu > 80" | bc -l) )); then
        warn "⚠️ High average CPU usage: ${avg_cpu}%"
        ((issues++))
    fi
    
    if (( $(echo "$avg_memory > 85" | bc -l) )); then
        warn "⚠️ High average memory usage: ${avg_memory}%"
        ((issues++))
    fi
    
    if (( $(echo "$avg_disk > 90" | bc -l) )); then
        warn "⚠️ High average disk usage: ${avg_disk}%"
        ((issues++))
    fi
    
    if (( $(echo "$avg_api > 2" | bc -l) )); then
        warn "⚠️ Slow average API response time: ${avg_api}s"
        ((issues++))
    fi
    
    if (( $(echo "$avg_web > 3" | bc -l) )); then
        warn "⚠️ Slow average web response time: ${avg_web}s"
        ((issues++))
    fi
    
    if [[ $issues -eq 0 ]]; then
        log "✅ No performance issues detected"
    else
        warn "⚠️ Found $issues performance issues"
    fi
}

check_database_performance() {
    log "Analyzing database performance..."
    
    cd "$PROJECT_DIR"
    
    # MariaDB performance
    local queries_per_sec=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Queries';" | grep Queries | awk '{print $2}')
    local connections=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Threads_connected';" | grep Threads_connected | awk '{print $2}')
    local slow_queries=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Slow_queries';" | grep Slow_queries | awk '{print $2}')
    
    info "MariaDB Performance:"
    echo "  Queries per second: $queries_per_sec"
    echo "  Active connections: $connections"
    echo "  Slow queries: $slow_queries"
    
    # Redis performance
    local redis_ops_per_sec=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info stats | grep instantaneous_ops_per_sec | cut -d: -f2 | tr -d '\r')
    local redis_memory=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info memory | grep used_memory_human | cut -d: -f2 | tr -d '\r')
    
    info "Redis Performance:"
    echo "  Operations per second: $redis_ops_per_sec"
    echo "  Memory usage: $redis_memory"
}

check_network_performance() {
    log "Analyzing network performance..."
    
    # Test network latency
    local latency_google=$(ping -c 3 8.8.8.8 2>/dev/null | grep "avg" | awk -F'/' '{print $5}' || echo "N/A")
    local latency_cloudflare=$(ping -c 3 1.1.1.1 2>/dev/null | grep "avg" | awk -F'/' '{print $5}' || echo "N/A")
    
    info "Network Latency:"
    echo "  Google DNS (8.8.8.8): ${latency_google}ms"
    echo "  Cloudflare DNS (1.1.1.1): ${latency_cloudflare}ms"
    
    # Test bandwidth
    if command -v iperf3 &> /dev/null; then
        info "Network bandwidth test (if iperf3 server available):"
        echo "  Run: iperf3 -c <server_ip> -t 10"
    else
        info "Install iperf3 for bandwidth testing: apt install iperf3"
    fi
}

generate_performance_report() {
    log "Generating performance analysis report..."
    
    {
        echo "=== SOCHI TRAVEL PERFORMANCE ANALYSIS REPORT ==="
        echo "Generated: $(date)"
        echo "Analysis Duration: ${DURATION} seconds"
        echo ""
        
        echo "=== SYSTEM RESOURCES ==="
        echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
        echo "Memory Usage: $(free | grep Mem | awk '{printf "%.0f%%", $3/$2 * 100.0}')"
        echo "Disk Usage: $(df / | awk 'NR==2 {print $5}')"
        echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
        echo ""
        
        echo "=== CONTAINER PERFORMANCE ==="
        docker stats --no-stream
        echo ""
        
        echo "=== APPLICATION PERFORMANCE ==="
        echo "API Response Time: $(curl -o /dev/null -s -w "%{time_total}" http://localhost:4000/health 2>/dev/null || echo "N/A")s"
        echo "Web Response Time: $(curl -o /dev/null -s -w "%{time_total}" http://localhost/ 2>/dev/null || echo "N/A")s"
        echo ""
        
        echo "=== DATABASE PERFORMANCE ==="
        cd "$PROJECT_DIR"
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Queries';" | grep Queries
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Threads_connected';" | grep Threads_connected
        docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info stats | grep instantaneous_ops_per_sec
        echo ""
        
        echo "=== NETWORK PERFORMANCE ==="
        echo "Latency to Google DNS: $(ping -c 3 8.8.8.8 2>/dev/null | grep "avg" | awk -F'/' '{print $5}' || echo "N/A")ms"
        echo "Latency to Cloudflare DNS: $(ping -c 3 1.1.1.1 2>/dev/null | grep "avg" | awk -F'/' '{print $5}' || echo "N/A")ms"
        
    } > "$REPORT_FILE"
    
    log "Performance analysis report generated: $REPORT_FILE"
}

show_performance_recommendations() {
    log "Performance optimization recommendations:"
    
    echo ""
    echo "🚀 PERFORMANCE OPTIMIZATION RECOMMENDATIONS:"
    echo ""
    echo "1. System Resources:"
    echo "   - Monitor CPU usage and add more cores if needed"
    echo "   - Increase memory if usage is consistently high"
    echo "   - Clean up disk space regularly"
    echo ""
    echo "2. Container Optimization:"
    echo "   - Set appropriate resource limits"
    echo "   - Use multi-stage builds to reduce image size"
    echo "   - Optimize container startup time"
    echo ""
    echo "3. Database Optimization:"
    echo "   - Tune MariaDB configuration for your workload"
    echo "   - Add database indexes for frequently queried columns"
    echo "   - Consider connection pooling"
    echo ""
    echo "4. Application Optimization:"
    echo "   - Implement caching strategies"
    echo "   - Optimize database queries"
    echo "   - Use CDN for static assets"
    echo ""
    echo "5. Network Optimization:"
    echo "   - Use faster DNS servers"
    echo "   - Implement load balancing"
    echo "   - Optimize network configuration"
}

main() {
    log "Starting Sochi Travel performance analysis"
    
    {
        echo "SOCHI TRAVEL PERFORMANCE ANALYSIS"
        echo "================================="
        echo "Started: $(date)"
        echo "Duration: ${DURATION} seconds"
        echo ""
        
    } > "$REPORT_FILE"
    
    check_system_resources
    check_container_performance
    check_application_performance
    check_database_performance
    check_network_performance
    monitor_performance
    generate_performance_report
    show_performance_recommendations
    
    log "Performance analysis completed! 📊"
    
    echo ""
    info "Performance Analysis Summary:"
    echo "  📊 Report: $REPORT_FILE"
    echo "  📋 Logs: $LOG_FILE"
    echo "  ⏱️ Duration: ${DURATION} seconds"
    echo "  📝 Verbose: $VERBOSE"
}

main "$@"
