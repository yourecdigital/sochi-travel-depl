#!/bin/bash

# Sochi Travel - Docker Diagnostics Script
# Usage: ./diagnostics/docker-diagnostics.sh [--verbose] [--fix]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-docker-diagnostics.log"
REPORT_FILE="/tmp/docker-diagnostics-$(date +%Y%m%d_%H%M%S).txt"

# Parse arguments
VERBOSE=false
AUTO_FIX=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --verbose)
            VERBOSE=true
            shift
            ;;
        --fix)
            AUTO_FIX=true
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

check_docker_daemon() {
    log "Checking Docker daemon status..."
    
    if ! systemctl is-active --quiet docker; then
        error "Docker daemon is not running"
        if [[ "$AUTO_FIX" == "true" ]]; then
            log "Attempting to start Docker daemon..."
            sudo systemctl start docker
            sleep 5
            if systemctl is-active --quiet docker; then
                log "Docker daemon started successfully"
            else
                error "Failed to start Docker daemon"
                return 1
            fi
        else
            echo "Fix: sudo systemctl start docker"
        fi
    else
        log "✅ Docker daemon is running"
    fi
}

check_docker_compose() {
    log "Checking Docker Compose availability..."
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose not found"
        if [[ "$AUTO_FIX" == "true" ]]; then
            log "Installing Docker Compose..."
            sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
        else
            echo "Fix: Install Docker Compose"
        fi
    else
        log "✅ Docker Compose is available"
    fi
}

check_containers_status() {
    log "Checking container status..."
    
    cd "$PROJECT_DIR"
    
    if [[ ! -f "docker-compose.prod.yml" ]]; then
        error "Docker Compose file not found"
        return 1
    fi
    
    local containers=$(docker-compose -f docker-compose.prod.yml ps --services)
    local failed_containers=()
    local unhealthy_containers=()
    
    for container in $containers; do
        local status=$(docker-compose -f docker-compose.prod.yml ps "$container" | grep "$container" | awk '{print $3}')
        local health=$(docker inspect --format='{{.State.Health.Status}}' "sochi-travel-${container}-prod" 2>/dev/null || echo "unknown")
        
        if [[ "$status" == "Up" ]]; then
            if [[ "$health" == "healthy" ]]; then
                log "✅ Container $container is running and healthy"
            elif [[ "$health" == "unhealthy" ]]; then
                warn "⚠️ Container $container is running but unhealthy"
                unhealthy_containers+=("$container")
            else
                info "ℹ️ Container $container is running (health status: $health)"
            fi
        else
            error "❌ Container $container is not running (Status: $status)"
            failed_containers+=("$container")
        fi
    done
    
    # Report issues
    if [[ ${#failed_containers[@]} -gt 0 ]]; then
        error "Failed containers: ${failed_containers[*]}"
        if [[ "$AUTO_FIX" == "true" ]]; then
            log "Attempting to restart failed containers..."
            for container in "${failed_containers[@]}"; do
                docker-compose -f docker-compose.prod.yml restart "$container"
            done
        else
            echo "Fix: docker-compose -f docker-compose.prod.yml restart ${failed_containers[*]}"
        fi
    fi
    
    if [[ ${#unhealthy_containers[@]} -gt 0 ]]; then
        warn "Unhealthy containers: ${unhealthy_containers[*]}"
        echo "Check logs: docker-compose -f docker-compose.prod.yml logs ${unhealthy_containers[*]}"
    fi
}

check_container_resources() {
    log "Checking container resource usage..."
    
    local containers=$(docker ps --format "{{.Names}}" | grep sochi-travel)
    
    for container in $containers; do
        local stats=$(docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}" "$container")
        echo "$stats"
        
        # Check for high resource usage
        local cpu_usage=$(docker stats --no-stream --format "{{.CPUPerc}}" "$container" | sed 's/%//')
        local mem_usage=$(docker stats --no-stream --format "{{.MemPerc}}" "$container" | sed 's/%//')
        
        if (( $(echo "$cpu_usage > 80" | bc -l) )); then
            warn "⚠️ Container $container has high CPU usage: ${cpu_usage}%"
        fi
        
        if (( $(echo "$mem_usage > 80" | bc -l) )); then
            warn "⚠️ Container $container has high memory usage: ${mem_usage}%"
        fi
    done
}

check_docker_images() {
    log "Checking Docker images..."
    
    local images=$(docker images --format "{{.Repository}}:{{.Tag}}" | grep sochi-travel)
    
    if [[ -z "$images" ]]; then
        warn "No Sochi Travel images found"
        echo "Fix: docker-compose -f docker-compose.prod.yml build"
    else
        log "✅ Found Sochi Travel images:"
        echo "$images"
        
        # Check for dangling images
        local dangling=$(docker images -f "dangling=true" -q)
        if [[ -n "$dangling" ]]; then
            warn "Found dangling images"
            if [[ "$AUTO_FIX" == "true" ]]; then
                log "Removing dangling images..."
                docker rmi $dangling
            else
                echo "Fix: docker rmi $dangling"
            fi
        fi
    fi
}

check_docker_volumes() {
    log "Checking Docker volumes..."
    
    local volumes=$(docker volume ls --format "{{.Name}}" | grep sochi-travel)
    
    if [[ -z "$volumes" ]]; then
        warn "No Sochi Travel volumes found"
    else
        log "✅ Found Sochi Travel volumes:"
        echo "$volumes"
        
        # Check volume usage
        for volume in $volumes; do
            local size=$(docker system df -v | grep "$volume" | awk '{print $3}' || echo "unknown")
            info "Volume $volume size: $size"
        done
    fi
}

check_docker_networks() {
    log "Checking Docker networks..."
    
    local networks=$(docker network ls --format "{{.Name}}" | grep sochi-travel)
    
    if [[ -z "$networks" ]]; then
        warn "No Sochi Travel networks found"
        echo "Fix: docker-compose -f docker-compose.prod.yml up -d"
    else
        log "✅ Found Sochi Travel networks:"
        echo "$networks"
        
        # Check network connectivity
        for network in $networks; do
            local containers=$(docker network inspect "$network" --format '{{range .Containers}}{{.Name}} {{end}}')
            info "Network $network containers: $containers"
        done
    fi
}

check_docker_logs() {
    log "Checking Docker logs for errors..."
    
    cd "$PROJECT_DIR"
    
    local containers=$(docker-compose -f docker-compose.prod.yml ps --services)
    local error_count=0
    
    for container in $containers; do
        local container_name="sochi-travel-${container}-prod"
        
        if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
            local errors=$(docker logs --since=1h "$container_name" 2>&1 | grep -i "error\|exception\|fatal\|panic" | wc -l)
            if [[ $errors -gt 0 ]]; then
                warn "⚠️ Container $container has $errors errors in the last hour"
                error_count=$((error_count + errors))
                
                if [[ "$VERBOSE" == "true" ]]; then
                    echo "Recent errors in $container:"
                    docker logs --since=1h "$container_name" 2>&1 | grep -i "error\|exception\|fatal\|panic" | tail -5
                fi
            else
                log "✅ Container $container has no recent errors"
            fi
        fi
    done
    
    if [[ $error_count -gt 0 ]]; then
        warn "Total errors found: $error_count"
        echo "Check logs: docker-compose -f docker-compose.prod.yml logs"
    fi
}

check_docker_permissions() {
    log "Checking Docker permissions..."
    
    if ! docker ps &> /dev/null; then
        error "Permission denied to access Docker"
        echo "Fix: sudo usermod -aG docker $USER"
        echo "Then logout and login again"
    else
        log "✅ Docker permissions are correct"
    fi
}

check_docker_disk_space() {
    log "Checking Docker disk space..."
    
    local docker_space=$(docker system df)
    echo "$docker_space"
    
    # Check for low disk space
    local available_space=$(df /var/lib/docker | awk 'NR==2 {print $4}')
    local available_gb=$((available_space / 1024 / 1024))
    
    if [[ $available_gb -lt 5 ]]; then
        warn "⚠️ Low disk space available: ${available_gb}GB"
        echo "Fix: docker system prune -a"
    else
        log "✅ Sufficient disk space available: ${available_gb}GB"
    fi
}

generate_docker_report() {
    log "Generating Docker diagnostics report..."
    
    {
        echo "=== SOCHI TRAVEL DOCKER DIAGNOSTICS REPORT ==="
        echo "Generated: $(date)"
        echo ""
        
        echo "=== DOCKER DAEMON STATUS ==="
        systemctl status docker --no-pager
        
        echo ""
        echo "=== CONTAINER STATUS ==="
        cd "$PROJECT_DIR"
        docker-compose -f docker-compose.prod.yml ps
        
        echo ""
        echo "=== CONTAINER RESOURCES ==="
        docker stats --no-stream
        
        echo ""
        echo "=== DOCKER IMAGES ==="
        docker images | grep sochi-travel
        
        echo ""
        echo "=== DOCKER VOLUMES ==="
        docker volume ls | grep sochi-travel
        
        echo ""
        echo "=== DOCKER NETWORKS ==="
        docker network ls | grep sochi-travel
        
        echo ""
        echo "=== DOCKER SYSTEM INFO ==="
        docker system df
        
        echo ""
        echo "=== RECENT ERRORS ==="
        for container in $(docker ps --format "{{.Names}}" | grep sochi-travel); do
            echo "--- $container ---"
            docker logs --since=1h "$container" 2>&1 | grep -i "error\|exception\|fatal" | tail -3
        done
        
    } > "$REPORT_FILE"
    
    log "Docker diagnostics report generated: $REPORT_FILE"
}

show_quick_fixes() {
    log "Quick fixes for common Docker issues:"
    
    echo ""
    echo "🔧 COMMON DOCKER ISSUES & FIXES:"
    echo ""
    echo "1. Containers not starting:"
    echo "   docker-compose -f docker-compose.prod.yml restart"
    echo ""
    echo "2. Out of disk space:"
    echo "   docker system prune -a"
    echo "   docker volume prune"
    echo ""
    echo "3. Permission denied:"
    echo "   sudo usermod -aG docker $USER"
    echo "   # Then logout and login again"
    echo ""
    echo "4. Network issues:"
    echo "   docker network prune"
    echo "   docker-compose -f docker-compose.prod.yml down"
    echo "   docker-compose -f docker-compose.prod.yml up -d"
    echo ""
    echo "5. Image issues:"
    echo "   docker-compose -f docker-compose.prod.yml build --no-cache"
    echo ""
    echo "6. Complete reset:"
    echo "   docker-compose -f docker-compose.prod.yml down"
    echo "   docker system prune -a"
    echo "   docker-compose -f docker-compose.prod.yml up -d"
}

main() {
    log "Starting Sochi Travel Docker diagnostics"
    
    {
        echo "SOCHI TRAVEL DOCKER DIAGNOSTICS"
        echo "==============================="
        echo "Started: $(date)"
        echo ""
        
    } > "$REPORT_FILE"
    
    check_docker_daemon
    check_docker_compose
    check_containers_status
    check_container_resources
    check_docker_images
    check_docker_volumes
    check_docker_networks
    check_docker_logs
    check_docker_permissions
    check_docker_disk_space
    generate_docker_report
    show_quick_fixes
    
    log "Docker diagnostics completed! 📊"
    
    echo ""
    info "Diagnostics Summary:"
    echo "  📊 Report: $REPORT_FILE"
    echo "  📋 Logs: $LOG_FILE"
    echo "  🔧 Auto-fix: $AUTO_FIX"
    echo "  📝 Verbose: $VERBOSE"
}

main "$@"
