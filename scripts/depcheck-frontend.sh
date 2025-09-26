#!/bin/bash

# ===========================================
# Depcheck Script for Frontend
# Проверяет зависимости только в frontend части
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
    log "Starting depcheck analysis for Frontend..."
    
    check_depcheck
    
    if [[ -d "apps/web" ]]; then
        if [[ -f "apps/web/package.json" ]]; then
            cd "apps/web"
            
            log "Checking dependencies in Frontend (apps/web)..."
            
            if depcheck; then
                info "✅ Frontend: No unused dependencies found"
            else
                warn "⚠️  Frontend: Unused dependencies detected"
            fi
            
            cd - > /dev/null
        else
            error "No package.json found in apps/web"
            exit 1
        fi
    else
        error "Directory apps/web does not exist"
        exit 1
    fi
    
    echo ""
    log "Frontend depcheck analysis completed!"
    
    echo ""
    info "Frontend-specific notes:"
    echo "  - React dependencies are checked"
    echo "  - Vite build tools are ignored"
    echo "  - TypeScript definitions are ignored"
    echo "  - Testing dependencies are ignored"
    echo "  - Asset files are ignored"
}

# Run main function
main "$@"

