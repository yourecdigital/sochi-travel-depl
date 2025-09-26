#!/bin/bash

# ===========================================
# Depcheck Script for Backend
# Проверяет зависимости только в backend части
# ===========================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Check if depcheck is installed
check_depcheck() {
    if ! command -v depcheck &> /dev/null; then
        error "depcheck is not installed. Installing..."
        npm install -g depcheck
    fi
}

# Main function
main() {
    log "Starting depcheck analysis for Backend..."
    
    check_depcheck
    
    if [[ -d "apps/api" ]]; then
        if [[ -f "apps/api/package.json" ]]; then
            cd "apps/api"
            
            log "Checking dependencies in Backend (apps/api)..."
            
            if depcheck; then
                info "✅ Backend: No unused dependencies found"
            else
                warn "⚠️  Backend: Unused dependencies detected"
            fi
            
            cd - > /dev/null
        else
            error "No package.json found in apps/api"
            exit 1
        fi
    else
        error "Directory apps/api does not exist"
        exit 1
    fi
    
    echo ""
    log "Backend depcheck analysis completed!"
    
    echo ""
    info "Backend-specific notes:"
    echo "  - Express dependencies are checked"
    echo "  - Database drivers are ignored"
    echo "  - Prisma ORM is ignored"
    echo "  - Security packages are ignored"
    echo "  - Testing dependencies are ignored"
    echo "  - Build tools are ignored"
}

# Run main function
main "$@"

