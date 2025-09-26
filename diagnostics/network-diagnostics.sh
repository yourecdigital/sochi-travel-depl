#!/bin/bash

# Sochi Travel - Network Diagnostics Script
# Usage: ./diagnostics/network-diagnostics.sh [--verbose] [--test-all]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-network-diagnostics.log"
REPORT_FILE="/tmp/network-diagnostics-$(date +%Y%m%d_%H%M%S).txt"

# Parse arguments
VERBOSE=false
TEST_ALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --verbose)
            VERBOSE=true
            shift
            ;;
        --test-all)
            TEST_ALL=true
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

check_docker_networks() {
    log "Checking Docker networks..."
    
    local networks=$(docker network ls --format "{{.Name}}" | grep sochi-travel)
    
    if [[ -z "$networks" ]]; then
        error "No Sochi Travel networks found"
        echo "Fix: docker-compose -f docker-compose.prod.yml up -d"
        return 1
    fi
    
    log "✅ Found networks: $networks"
    
    for network in $networks; do
        info "Network $network details:"
        docker network inspect "$network" --format '{{.IPAM.Config}}'
    done
}

check_container_connectivity() {
    log "Checking container-to-container connectivity..."
    
    cd "$PROJECT_DIR"
    
    # Get all running containers
    local containers=$(docker-compose -f docker-compose.prod.yml ps --services)
    local connectivity_issues=()
    
    for container in $containers; do
        local container_name="sochi-travel-${container}-prod"
        
        if docker ps --format "{{.Names}}" | grep -q "$container_name"; then
            info "Testing connectivity from $container_name..."
            
            # Test connectivity to other containers
            for target_container in $containers; do
                if [[ "$container" != "$target_container" ]]; then
                    local target_name="sochi-travel-${target_container}-prod"
                    
                    if docker exec "$container_name" ping -c 1 "$target_name" &> /dev/null; then
                        log "✅ $container_name -> $target_name: OK"
                    else
                        error "❌ $container_name -> $target_name: FAILED"
                        connectivity_issues+=("$container_name -> $target_name")
                    fi
                fi
            done
        fi
    done
    
    if [[ ${#connectivity_issues[@]} -gt 0 ]]; then
        error "Connectivity issues found:"
        for issue in "${connectivity_issues[@]}"; do
            echo "  - $issue"
        done
    fi
}

check_external_connectivity() {
    log "Checking external connectivity..."
    
    # Test internet connectivity
    if ping -c 1 8.8.8.8 &> /dev/null; then
        log "✅ Internet connectivity: OK"
    else
        error "❌ Internet connectivity: FAILED"
    fi
    
    # Test DNS resolution
    if nslookup google.com &> /dev/null; then
        log "✅ DNS resolution: OK"
    else
        error "❌ DNS resolution: FAILED"
    fi
    
    # Test specific external services
    local external_services=(
        "registry-1.docker.io:443"
        "index.docker.io:443"
        "github.com:443"
    )
    
    for service in "${external_services[@]}"; do
        local host=$(echo "$service" | cut -d: -f1)
        local port=$(echo "$service" | cut -d: -f2)
        
        if timeout 5 bash -c "</dev/tcp/$host/$port" &> /dev/null; then
            log "✅ $service: OK"
        else
            warn "⚠️ $service: FAILED"
        fi
    done
}

check_port_accessibility() {
    log "Checking port accessibility..."
    
    cd "$PROJECT_DIR"
    
    # Define expected ports
    local ports=(
        "80:web"
        "443:web"
        "4000:api"
        "3306:mariadb"
        "6379:redis"
        "9000:minio"
        "9001:minio"
        "9090:prometheus"
        "3000:grafana"
    )
    
    for port_mapping in "${ports[@]}"; do
        local port=$(echo "$port_mapping" | cut -d: -f1)
        local service=$(echo "$port_mapping" | cut -d: -f2)
        
        if netstat -tlnp | grep -q ":$port "; then
            log "✅ Port $port ($service): LISTENING"
        else
            warn "⚠️ Port $port ($service): NOT LISTENING"
        fi
    done
}

check_firewall_rules() {
    log "Checking firewall rules..."
    
    # Check UFW status
    if command -v ufw &> /dev/null; then
        local ufw_status=$(ufw status | grep "Status:" | awk '{print $2}')
        if [[ "$ufw_status" == "active" ]]; then
            log "✅ UFW is active"
            
            # Check specific rules
            local rules=$(ufw status numbered | grep -E "(80|443|4000|22)")
            if [[ -n "$rules" ]]; then
                info "UFW rules for Sochi Travel:"
                echo "$rules"
            else
                warn "No specific UFW rules found for Sochi Travel"
            fi
        else
            warn "UFW is not active"
        fi
    else
        warn "UFW not installed"
    fi
    
    # Check iptables rules
    if command -v iptables &> /dev/null; then
        local iptables_rules=$(iptables -L | grep -E "(80|443|4000)" | wc -l)
        if [[ $iptables_rules -gt 0 ]]; then
            log "✅ Found $iptables_rules iptables rules"
        else
            warn "No iptables rules found for Sochi Travel ports"
        fi
    fi
}

check_dns_resolution() {
    log "Checking DNS resolution..."
    
    # Test internal DNS resolution
    local internal_hosts=(
        "mariadb"
        "redis"
        "minio"
        "api"
        "web"
    )
    
    for host in "${internal_hosts[@]}"; do
        if nslookup "$host" &> /dev/null; then
            log "✅ Internal DNS $host: OK"
        else
            warn "⚠️ Internal DNS $host: FAILED"
        fi
    done
    
    # Test external DNS resolution
    local external_hosts=(
        "google.com"
        "github.com"
        "docker.io"
    )
    
    for host in "${external_hosts[@]}"; do
        if nslookup "$host" &> /dev/null; then
            log "✅ External DNS $host: OK"
        else
            warn "⚠️ External DNS $host: FAILED"
        fi
    done
}

check_network_performance() {
    log "Checking network performance..."
    
    # Test latency to external services
    local external_services=(
        "8.8.8.8"
        "1.1.1.1"
        "google.com"
    )
    
    for service in "${external_services[@]}"; do
        local latency=$(ping -c 3 "$service" 2>/dev/null | grep "avg" | awk -F'/' '{print $5}' || echo "N/A")
        if [[ "$latency" != "N/A" ]]; then
            info "Latency to $service: ${latency}ms"
            
            # Check if latency is acceptable (< 100ms)
            if (( $(echo "$latency < 100" | bc -l) )); then
                log "✅ Latency to $service: GOOD (${latency}ms)"
            else
                warn "⚠️ Latency to $service: HIGH (${latency}ms)"
            fi
        else
            warn "⚠️ Could not measure latency to $service"
        fi
    done
}

check_ssl_certificates() {
    log "Checking SSL certificates..."
    
    # Check if SSL certificates exist
    local ssl_paths=(
        "/etc/letsencrypt/live"
        "/etc/ssl/certs"
        "/opt/sochi-travel/ssl"
    )
    
    for ssl_path in "${ssl_paths[@]}"; do
        if [[ -d "$ssl_path" ]]; then
            log "✅ SSL path found: $ssl_path"
            
            # Check for certificate files
            local cert_files=$(find "$ssl_path" -name "*.crt" -o -name "*.pem" 2>/dev/null | wc -l)
            if [[ $cert_files -gt 0 ]]; then
                info "Found $cert_files certificate files in $ssl_path"
            fi
        else
            warn "SSL path not found: $ssl_path"
        fi
    done
    
    # Check certificate expiration
    if command -v openssl &> /dev/null; then
        local cert_files=$(find /etc/letsencrypt/live -name "fullchain.pem" 2>/dev/null)
        for cert_file in $cert_files; do
            local expiration=$(openssl x509 -in "$cert_file" -noout -dates | grep "notAfter" | cut -d= -f2)
            local expiration_date=$(date -d "$expiration" +%s)
            local current_date=$(date +%s)
            local days_until_expiry=$(( (expiration_date - current_date) / 86400 ))
            
            if [[ $days_until_expiry -gt 30 ]]; then
                log "✅ Certificate $cert_file expires in $days_until_expiry days"
            elif [[ $days_until_expiry -gt 0 ]]; then
                warn "⚠️ Certificate $cert_file expires in $days_until_expiry days"
            else
                error "❌ Certificate $cert_file has expired"
            fi
        done
    fi
}

test_application_endpoints() {
    log "Testing application endpoints..."
    
    local endpoints=(
        "http://localhost/health"
        "http://localhost:4000/health"
        "http://localhost:9000/minio/health/live"
        "http://localhost:9090/-/healthy"
        "http://localhost:3000/api/health"
    )
    
    for endpoint in "${endpoints[@]}"; do
        local service=$(echo "$endpoint" | cut -d/ -f3 | cut -d: -f1)
        local port=$(echo "$endpoint" | cut -d: -f3 | cut -d/ -f1)
        
        if curl -f -s --max-time 10 "$endpoint" &> /dev/null; then
            log "✅ $endpoint: OK"
        else
            warn "⚠️ $endpoint: FAILED"
        fi
    done
}

check_network_security() {
    log "Checking network security..."
    
    # Check for open ports
    local open_ports=$(netstat -tlnp | grep LISTEN | awk '{print $4}' | cut -d: -f2 | sort -u)
    local suspicious_ports=()
    
    for port in $open_ports; do
        case $port in
            22|80|443|4000|3306|6379|9000|9001|9090|3000)
                # Expected ports
                ;;
            *)
                suspicious_ports+=("$port")
                ;;
        esac
    done
    
    if [[ ${#suspicious_ports[@]} -gt 0 ]]; then
        warn "Suspicious open ports found: ${suspicious_ports[*]}"
    else
        log "✅ No suspicious open ports found"
    fi
    
    # Check for failed connection attempts
    if [[ -f "/var/log/auth.log" ]]; then
        local failed_attempts=$(grep "Failed password" /var/log/auth.log 2>/dev/null | wc -l)
        if [[ $failed_attempts -gt 10 ]]; then
            warn "⚠️ High number of failed SSH attempts: $failed_attempts"
        else
            log "✅ SSH security: OK ($failed_attempts failed attempts)"
        fi
    fi
}

generate_network_report() {
    log "Generating network diagnostics report..."
    
    {
        echo "=== SOCHI TRAVEL NETWORK DIAGNOSTICS REPORT ==="
        echo "Generated: $(date)"
        echo ""
        
        echo "=== DOCKER NETWORKS ==="
        docker network ls | grep sochi-travel
        echo ""
        
        echo "=== NETWORK INTERFACES ==="
        ip addr show
        echo ""
        
        echo "=== ROUTING TABLE ==="
        ip route show
        echo ""
        
        echo "=== OPEN PORTS ==="
        netstat -tlnp
        echo ""
        
        echo "=== FIREWALL STATUS ==="
        ufw status verbose
        echo ""
        
        echo "=== DNS CONFIGURATION ==="
        cat /etc/resolv.conf
        echo ""
        
        echo "=== CONNECTIVITY TEST RESULTS ==="
        for endpoint in "http://localhost/health" "http://localhost:4000/health" "http://localhost:9000/minio/health/live"; do
            echo "Testing $endpoint..."
            curl -f -s --max-time 5 "$endpoint" && echo "OK" || echo "FAILED"
        done
        
    } > "$REPORT_FILE"
    
    log "Network diagnostics report generated: $REPORT_FILE"
}

show_network_fixes() {
    log "Quick fixes for common network issues:"
    
    echo ""
    echo "🔧 COMMON NETWORK ISSUES & FIXES:"
    echo ""
    echo "1. Container connectivity issues:"
    echo "   docker network inspect sochi-travel-network"
    echo "   docker-compose -f docker-compose.prod.yml restart"
    echo ""
    echo "2. Port not accessible:"
    echo "   sudo ufw allow 80"
    echo "   sudo ufw allow 443"
    echo "   sudo ufw allow 4000"
    echo ""
    echo "3. DNS resolution issues:"
    echo "   sudo systemctl restart systemd-resolved"
    echo "   echo 'nameserver 8.8.8.8' | sudo tee -a /etc/resolv.conf"
    echo ""
    echo "4. SSL certificate issues:"
    echo "   sudo certbot renew"
    echo "   sudo systemctl reload nginx"
    echo ""
    echo "5. Network performance issues:"
    echo "   sudo sysctl -w net.core.rmem_max=16777216"
    echo "   sudo sysctl -w net.core.wmem_max=16777216"
    echo ""
    echo "6. Complete network reset:"
    echo "   docker-compose -f docker-compose.prod.yml down"
    echo "   docker network prune"
    echo "   docker-compose -f docker-compose.prod.yml up -d"
}

main() {
    log "Starting Sochi Travel network diagnostics"
    
    {
        echo "SOCHI TRAVEL NETWORK DIAGNOSTICS"
        echo "==============================="
        echo "Started: $(date)"
        echo ""
        
    } > "$REPORT_FILE"
    
    check_docker_networks
    check_container_connectivity
    check_external_connectivity
    check_port_accessibility
    check_firewall_rules
    check_dns_resolution
    check_network_performance
    check_ssl_certificates
    test_application_endpoints
    check_network_security
    generate_network_report
    show_network_fixes
    
    log "Network diagnostics completed! 🌐"
    
    echo ""
    info "Network Diagnostics Summary:"
    echo "  📊 Report: $REPORT_FILE"
    echo "  📋 Logs: $LOG_FILE"
    echo "  🔧 Test all: $TEST_ALL"
    echo "  📝 Verbose: $VERBOSE"
}

main "$@"
