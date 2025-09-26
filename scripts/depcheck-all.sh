#!/bin/bash

# ===========================================
# Depcheck Script for Monorepo
# Проверяет зависимости во всех частях проекта
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

# Run depcheck for a specific directory
run_depcheck() {
    local dir="$1"
    local name="$2"
    
    if [[ -d "$dir" ]]; then
        log "Checking dependencies in $name ($dir)..."
        
        if [[ -f "$dir/package.json" ]]; then
            cd "$dir"
            if depcheck; then
                info "✅ $name: No unused dependencies found"
            else
                warn "⚠️  $name: Unused dependencies detected"
            fi
            cd - > /dev/null
        else
            warn "No package.json found in $dir"
        fi
    else
        warn "Directory $dir does not exist"
    fi
}

# Main function
main() {
    log "Starting depcheck analysis for monorepo..."
    
    check_depcheck
    
    echo ""
    info "Checking root project..."
    if depcheck; then
        info "✅ Root: No unused dependencies found"
    else
        warn "⚠️  Root: Unused dependencies detected"
    fi
    
    echo ""
    info "Checking sub-projects..."
    
    # Check each app
    run_depcheck "apps/web" "Frontend (Web)"
    run_depcheck "apps/api" "Backend (API)"
    
    # Check packages if they exist
    if [[ -d "packages" ]]; then
        for package in packages/*/; do
            if [[ -d "$package" ]]; then
                package_name=$(basename "$package")
                run_depcheck "$package" "Package ($package_name)"
            fi
        done
    fi
    
    # Check scripts
    run_depcheck "scripts" "Scripts"
    
    echo ""
    log "Depcheck analysis completed!"
    
    echo ""
    info "Summary:"
    echo "  - Root project: Checked"
    echo "  - Frontend (apps/web): Checked"
    echo "  - Backend (apps/api): Checked"
    echo "  - Packages: Checked"
    echo "  - Scripts: Checked"
    
    echo ""
    warn "Note: Some dependencies may appear as unused but are actually needed for:"
    echo "  - Build tools and bundlers"
    echo "  - Type definitions"
    echo "  - Development tools"
    echo "  - Runtime dependencies"
    echo "  - Monorepo internal references"
}

# Run main function
main "$@"

