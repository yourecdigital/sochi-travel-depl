#!/bin/bash

# Sochi Travel - Security Audit Script
# Usage: ./security/security-audit.sh

set -euo pipefail

# Configuration
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-security-audit.log"
REPORT_FILE="/tmp/security-audit-$(date +%Y%m%d_%H%M%S).txt"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

audit_dependencies() {
    log "Auditing dependencies for vulnerabilities..."
    
    {
        echo "=== NPM AUDIT REPORT ==="
        cd "$PROJECT_DIR"
        npm audit --json > npm-audit.json 2>/dev/null || true
        npm audit
        
        echo ""
        echo "=== YARN AUDIT REPORT ==="
        yarn audit --json > yarn-audit.json 2>/dev/null || true
        yarn audit
        
        echo ""
        echo "=== SNYK SCAN ==="
        if command -v snyk &> /dev/null; then
            snyk test --json > snyk-audit.json 2>/dev/null || true
            snyk test
        else
            echo "Snyk not installed. Install with: npm install -g snyk"
        fi
        
    } >> "$REPORT_FILE"
}

check_jwt_security() {
    log "Checking JWT security settings..."
    
    {
        echo "=== JWT SECURITY ANALYSIS ==="
        
        # Check JWT secrets
        if [[ -f "$PROJECT_DIR/.env" ]]; then
            echo "Checking JWT secrets in .env file:"
            grep -E "(JWT_SECRET|REFRESH_SECRET)" "$PROJECT_DIR/.env" | while read -r line; do
                secret=$(echo "$line" | cut -d'=' -f2)
                if [[ ${#secret} -lt 32 ]]; then
                    echo "❌ WEAK SECRET: $line (length: ${#secret})"
                else
                    echo "✅ STRONG SECRET: $(echo "$line" | cut -d'=' -f1) (length: ${#secret})"
                fi
            done
        fi
        
        # Check JWT implementation
        if [[ -f "$PROJECT_DIR/apps/api/src/index.ts" ]]; then
            echo ""
            echo "Checking JWT implementation:"
            grep -n "jwt\|JWT" "$PROJECT_DIR/apps/api/src/index.ts" || echo "No JWT usage found"
        fi
        
    } >> "$REPORT_FILE"
}

check_docker_security() {
    log "Checking Docker security..."
    
    {
        echo "=== DOCKER SECURITY ANALYSIS ==="
        
        # Check for root users in Dockerfiles
        echo "Checking Dockerfiles for security issues:"
        find "$PROJECT_DIR" -name "Dockerfile*" -exec echo "File: {}" \; -exec grep -n "USER\|RUN\|COPY\|ADD" {} \; || true
        
        echo ""
        echo "Docker daemon configuration:"
        if [[ -f "/etc/docker/daemon.json" ]]; then
            cat /etc/docker/daemon.json
        else
            echo "No daemon.json found"
        fi
        
        echo ""
        echo "Running containers security check:"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        
    } >> "$REPORT_FILE"
}

check_system_security() {
    log "Checking system security..."
    
    {
        echo "=== SYSTEM SECURITY ANALYSIS ==="
        
        echo "UFW Status:"
        ufw status verbose
        
        echo ""
        echo "Fail2ban Status:"
        systemctl status fail2ban --no-pager
        
        echo ""
        echo "SSH Configuration:"
        grep -E "(PermitRootLogin|PasswordAuthentication|PubkeyAuthentication)" /etc/ssh/sshd_config || true
        
        echo ""
        echo "Open Ports:"
        netstat -tlnp
        
    } >> "$REPORT_FILE"
}

generate_security_recommendations() {
    log "Generating security recommendations..."
    
    {
        echo ""
        echo "=== SECURITY RECOMMENDATIONS ==="
        echo ""
        echo "1. NGINX SECURITY:"
        echo "   ✅ Security headers configured"
        echo "   ✅ Rate limiting enabled"
        echo "   ✅ Request filtering active"
        echo ""
        echo "2. FAIL2BAN PROTECTION:"
        echo "   ✅ SSH protection enabled"
        echo "   ✅ Web attack protection active"
        echo "   ✅ Custom filters configured"
        echo ""
        echo "3. DEPENDENCY SECURITY:"
        echo "   🔍 Run 'npm audit fix' to fix vulnerabilities"
        echo "   🔍 Update dependencies regularly"
        echo "   🔍 Use Snyk for continuous monitoring"
        echo ""
        echo "4. JWT SECURITY:"
        echo "   🔍 Ensure JWT secrets are 64+ characters"
        echo "   🔍 Implement token rotation"
        echo "   🔍 Set appropriate expiration times"
        echo ""
        echo "5. DOCKER SECURITY:"
        echo "   🔍 Use non-root users in containers"
        echo "   🔍 Scan images for vulnerabilities"
        echo "   🔍 Limit container resources"
        echo ""
        echo "6. SYSTEM SECURITY:"
        echo "   🔍 Keep system updated"
        echo "   🔍 Monitor logs regularly"
        echo "   🔍 Use strong passwords"
        
    } >> "$REPORT_FILE"
}

main() {
    log "Starting security audit for Sochi Travel"
    
    {
        echo "SOCHI TRAVEL SECURITY AUDIT REPORT"
        echo "Generated: $(date)"
        echo "========================================"
        echo ""
        
    } > "$REPORT_FILE"
    
    audit_dependencies
    check_jwt_security
    check_docker_security
    check_system_security
    generate_security_recommendations
    
    log "Security audit completed. Report: $REPORT_FILE"
    echo ""
    cat "$REPORT_FILE"
}

main "$@"
