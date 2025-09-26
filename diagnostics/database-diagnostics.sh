#!/bin/bash

# Sochi Travel - Database Diagnostics Script
# Usage: ./diagnostics/database-diagnostics.sh [--verbose] [--repair]

set -euo pipefail

# Configuration
PROJECT_NAME="sochi-travel"
PROJECT_DIR="/opt/sochi-travel"
LOG_FILE="/var/log/sochi-travel-db-diagnostics.log"
REPORT_FILE="/tmp/database-diagnostics-$(date +%Y%m%d_%H%M%S).txt"

# Parse arguments
VERBOSE=false
AUTO_REPAIR=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --verbose)
            VERBOSE=true
            shift
            ;;
        --repair)
            AUTO_REPAIR=true
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

check_mariadb_status() {
    log "Checking MariaDB status..."
    
    cd "$PROJECT_DIR"
    
    # Check if MariaDB container is running
    if ! docker-compose -f docker-compose.prod.yml ps mariadb | grep -q "Up"; then
        error "MariaDB container is not running"
        if [[ "$AUTO_REPAIR" == "true" ]]; then
            log "Attempting to start MariaDB..."
            docker-compose -f docker-compose.prod.yml up -d mariadb
            sleep 10
            if docker-compose -f docker-compose.prod.yml ps mariadb | grep -q "Up"; then
                log "MariaDB started successfully"
            else
                error "Failed to start MariaDB"
                return 1
            fi
        else
            echo "Fix: docker-compose -f docker-compose.prod.yml up -d mariadb"
        fi
    else
        log "✅ MariaDB container is running"
    fi
}

check_mariadb_connectivity() {
    log "Testing MariaDB connectivity..."
    
    cd "$PROJECT_DIR"
    
    # Test connection to MariaDB
    if docker-compose -f docker-compose.prod.yml exec -T mariadb mysqladmin ping &> /dev/null; then
        log "✅ MariaDB connection: OK"
    else
        error "❌ MariaDB connection: FAILED"
        echo "Fix: Check MariaDB logs: docker-compose -f docker-compose.prod.yml logs mariadb"
        return 1
    fi
}

check_mariadb_performance() {
    log "Checking MariaDB performance..."
    
    cd "$PROJECT_DIR"
    
    # Get MariaDB performance metrics
    local queries_per_sec=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Queries';" | grep Queries | awk '{print $2}')
    local connections=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Threads_connected';" | grep Threads_connected | awk '{print $2}')
    local max_connections=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW VARIABLES LIKE 'max_connections';" | grep max_connections | awk '{print $2}')
    
    info "MariaDB Performance Metrics:"
    echo "  Queries per second: $queries_per_sec"
    echo "  Current connections: $connections"
    echo "  Max connections: $max_connections"
    
    # Check connection usage
    local connection_usage=$((connections * 100 / max_connections))
    if [[ $connection_usage -gt 80 ]]; then
        warn "⚠️ High connection usage: ${connection_usage}%"
    else
        log "✅ Connection usage: ${connection_usage}%"
    fi
    
    # Check buffer pool hit rate
    local buffer_pool_hits=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read_requests';" | grep Innodb_buffer_pool_read_requests | awk '{print $2}')
    local buffer_pool_misses=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_reads';" | grep Innodb_buffer_pool_reads | awk '{print $2}')
    
    if [[ $buffer_pool_hits -gt 0 ]]; then
        local hit_rate=$((buffer_pool_hits * 100 / (buffer_pool_hits + buffer_pool_misses)))
        if [[ $hit_rate -gt 95 ]]; then
            log "✅ Buffer pool hit rate: ${hit_rate}%"
        else
            warn "⚠️ Low buffer pool hit rate: ${hit_rate}%"
        fi
    fi
}

check_mariadb_logs() {
    log "Checking MariaDB logs for errors..."
    
    cd "$PROJECT_DIR"
    
    local error_count=$(docker-compose -f docker-compose.prod.yml logs --since=1h mariadb 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    
    if [[ $error_count -gt 0 ]]; then
        warn "⚠️ Found $error_count errors in MariaDB logs"
        
        if [[ "$VERBOSE" == "true" ]]; then
            echo "Recent MariaDB errors:"
            docker-compose -f docker-compose.prod.yml logs --since=1h mariadb 2>&1 | grep -i "error\|exception\|fatal" | tail -5
        fi
    else
        log "✅ No recent errors in MariaDB logs"
    fi
}

check_redis_status() {
    log "Checking Redis status..."
    
    cd "$PROJECT_DIR"
    
    # Check if Redis container is running
    if ! docker-compose -f docker-compose.prod.yml ps redis | grep -q "Up"; then
        error "Redis container is not running"
        if [[ "$AUTO_REPAIR" == "true" ]]; then
            log "Attempting to start Redis..."
            docker-compose -f docker-compose.prod.yml up -d redis
            sleep 5
            if docker-compose -f docker-compose.prod.yml ps redis | grep -q "Up"; then
                log "Redis started successfully"
            else
                error "Failed to start Redis"
                return 1
            fi
        else
            echo "Fix: docker-compose -f docker-compose.prod.yml up -d redis"
        fi
    else
        log "✅ Redis container is running"
    fi
}

check_redis_connectivity() {
    log "Testing Redis connectivity..."
    
    cd "$PROJECT_DIR"
    
    # Test connection to Redis
    if docker-compose -f docker-compose.prod.yml exec -T redis redis-cli ping &> /dev/null; then
        log "✅ Redis connection: OK"
    else
        error "❌ Redis connection: FAILED"
        echo "Fix: Check Redis logs: docker-compose -f docker-compose.prod.yml logs redis"
        return 1
    fi
}

check_redis_performance() {
    log "Checking Redis performance..."
    
    cd "$PROJECT_DIR"
    
    # Get Redis performance metrics
    local memory_usage=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info memory | grep used_memory_human | cut -d: -f2 | tr -d '\r')
    local connected_clients=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info clients | grep connected_clients | cut -d: -f2 | tr -d '\r')
    local total_commands=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info stats | grep total_commands_processed | cut -d: -f2 | tr -d '\r')
    
    info "Redis Performance Metrics:"
    echo "  Memory usage: $memory_usage"
    echo "  Connected clients: $connected_clients"
    echo "  Total commands processed: $total_commands"
    
    # Check memory usage
    local memory_used=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info memory | grep used_memory | cut -d: -f2 | tr -d '\r')
    local memory_max=$(docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info memory | grep maxmemory | cut -d: -f2 | tr -d '\r')
    
    if [[ $memory_max -gt 0 ]]; then
        local memory_usage_percent=$((memory_used * 100 / memory_max))
        if [[ $memory_usage_percent -gt 80 ]]; then
            warn "⚠️ High Redis memory usage: ${memory_usage_percent}%"
        else
            log "✅ Redis memory usage: ${memory_usage_percent}%"
        fi
    fi
}

check_redis_logs() {
    log "Checking Redis logs for errors..."
    
    cd "$PROJECT_DIR"
    
    local error_count=$(docker-compose -f docker-compose.prod.yml logs --since=1h redis 2>&1 | grep -i "error\|exception\|fatal" | wc -l)
    
    if [[ $error_count -gt 0 ]]; then
        warn "⚠️ Found $error_count errors in Redis logs"
        
        if [[ "$VERBOSE" == "true" ]]; then
            echo "Recent Redis errors:"
            docker-compose -f docker-compose.prod.yml logs --since=1h redis 2>&1 | grep -i "error\|exception\|fatal" | tail -5
        fi
    else
        log "✅ No recent errors in Redis logs"
    fi
}

check_database_backups() {
    log "Checking database backups..."
    
    local backup_dir="/opt/backups/sochi-travel"
    
    if [[ -d "$backup_dir" ]]; then
        local backup_count=$(find "$backup_dir" -name "*.sql" -mtime -7 | wc -l)
        local latest_backup=$(find "$backup_dir" -name "*.sql" -mtime -7 | sort | tail -1)
        
        if [[ $backup_count -gt 0 ]]; then
            log "✅ Found $backup_count backups in the last 7 days"
            
            if [[ -n "$latest_backup" ]]; then
                local backup_size=$(du -h "$latest_backup" | cut -f1)
                local backup_age=$(find "$backup_dir" -name "*.sql" -mtime -7 | sort | tail -1 | xargs stat -c %Y | xargs -I {} date -d @{} +%Y-%m-%d)
                info "Latest backup: $latest_backup (${backup_size}, $backup_age)"
            fi
        else
            warn "⚠️ No recent backups found"
            echo "Fix: Run backup script: ./scripts/backup.sh"
        fi
    else
        warn "⚠️ Backup directory not found: $backup_dir"
    fi
}

check_database_schema() {
    log "Checking database schema..."
    
    cd "$PROJECT_DIR"
    
    # Check if database exists
    local db_exists=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW DATABASES LIKE '${DB_NAME}';" | grep -c "${DB_NAME}" || echo "0")
    
    if [[ $db_exists -eq 0 ]]; then
        error "❌ Database ${DB_NAME} does not exist"
        echo "Fix: Create database or run migrations"
        return 1
    else
        log "✅ Database ${DB_NAME} exists"
    fi
    
    # Check tables
    local table_count=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "USE ${DB_NAME}; SHOW TABLES;" | wc -l)
    info "Database has $table_count tables"
    
    # Check for common tables
    local expected_tables=("users" "tours" "hotels" "bookings")
    for table in "${expected_tables[@]}"; do
        local table_exists=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "USE ${DB_NAME}; SHOW TABLES LIKE '$table';" | grep -c "$table" || echo "0")
        if [[ $table_exists -eq 0 ]]; then
            warn "⚠️ Table $table not found"
        else
            log "✅ Table $table exists"
        fi
    done
}

check_database_permissions() {
    log "Checking database permissions..."
    
    cd "$PROJECT_DIR"
    
    # Check user permissions
    local user_permissions=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GRANTS FOR '${DB_USER}'@'%';" 2>/dev/null || echo "No permissions found")
    
    if [[ "$user_permissions" == "No permissions found" ]]; then
        error "❌ Database user ${DB_USER} has no permissions"
        echo "Fix: Grant permissions to user"
    else
        log "✅ Database user ${DB_USER} has permissions"
    fi
}

check_database_connections() {
    log "Checking database connections..."
    
    cd "$PROJECT_DIR"
    
    # Check active connections
    local active_connections=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW PROCESSLIST;" | wc -l)
    local max_connections=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW VARIABLES LIKE 'max_connections';" | grep max_connections | awk '{print $2}')
    
    info "Database connections: $active_connections active, $max_connections max"
    
    if [[ $active_connections -gt $((max_connections * 80 / 100)) ]]; then
        warn "⚠️ High number of active connections: $active_connections"
    else
        log "✅ Connection count is normal: $active_connections"
    fi
}

check_database_locks() {
    log "Checking database locks..."
    
    cd "$PROJECT_DIR"
    
    # Check for locked tables
    local locked_tables=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW OPEN TABLES WHERE In_use > 0;" | wc -l)
    
    if [[ $locked_tables -gt 0 ]]; then
        warn "⚠️ Found $locked_tables locked tables"
        
        if [[ "$VERBOSE" == "true" ]]; then
            echo "Locked tables:"
            docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW OPEN TABLES WHERE In_use > 0;"
        fi
    else
        log "✅ No locked tables found"
    fi
    
    # Check for long-running queries
    local long_queries=$(docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW PROCESSLIST;" | awk '$6 > 30 {print $0}' | wc -l)
    
    if [[ $long_queries -gt 0 ]]; then
        warn "⚠️ Found $long_queries long-running queries (>30s)"
        
        if [[ "$VERBOSE" == "true" ]]; then
            echo "Long-running queries:"
            docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW PROCESSLIST;" | awk '$6 > 30 {print $0}'
        fi
    else
        log "✅ No long-running queries found"
    fi
}

generate_database_report() {
    log "Generating database diagnostics report..."
    
    {
        echo "=== SOCHI TRAVEL DATABASE DIAGNOSTICS REPORT ==="
        echo "Generated: $(date)"
        echo ""
        
        echo "=== MARIADB STATUS ==="
        cd "$PROJECT_DIR"
        docker-compose -f docker-compose.prod.yml ps mariadb
        
        echo ""
        echo "=== REDIS STATUS ==="
        docker-compose -f docker-compose.prod.yml ps redis
        
        echo ""
        echo "=== MARIADB PERFORMANCE ==="
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Queries';"
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW GLOBAL STATUS LIKE 'Threads_connected';"
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "SHOW VARIABLES LIKE 'max_connections';"
        
        echo ""
        echo "=== REDIS PERFORMANCE ==="
        docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info memory | grep used_memory_human
        docker-compose -f docker-compose.prod.yml exec -T redis redis-cli info clients | grep connected_clients
        
        echo ""
        echo "=== DATABASE SCHEMA ==="
        docker-compose -f docker-compose.prod.yml exec -T mariadb mysql -e "USE ${DB_NAME}; SHOW TABLES;"
        
        echo ""
        echo "=== RECENT ERRORS ==="
        echo "MariaDB errors:"
        docker-compose -f docker-compose.prod.yml logs --since=1h mariadb 2>&1 | grep -i "error\|exception\|fatal" | tail -3
        echo ""
        echo "Redis errors:"
        docker-compose -f docker-compose.prod.yml logs --since=1h redis 2>&1 | grep -i "error\|exception\|fatal" | tail -3
        
    } > "$REPORT_FILE"
    
    log "Database diagnostics report generated: $REPORT_FILE"
}

show_database_fixes() {
    log "Quick fixes for common database issues:"
    
    echo ""
    echo "🔧 COMMON DATABASE ISSUES & FIXES:"
    echo ""
    echo "1. Database connection issues:"
    echo "   docker-compose -f docker-compose.prod.yml restart mariadb"
    echo "   docker-compose -f docker-compose.prod.yml logs mariadb"
    echo ""
    echo "2. Redis connection issues:"
    echo "   docker-compose -f docker-compose.prod.yml restart redis"
    echo "   docker-compose -f docker-compose.prod.yml logs redis"
    echo ""
    echo "3. Database performance issues:"
    echo "   docker-compose -f docker-compose.prod.yml exec mariadb mysql -e 'OPTIMIZE TABLE table_name;'"
    echo "   docker-compose -f docker-compose.prod.yml exec mariadb mysql -e 'ANALYZE TABLE table_name;'"
    echo ""
    echo "4. Database corruption:"
    echo "   docker-compose -f docker-compose.prod.yml exec mariadb mysqlcheck -u root -p --check --all-databases"
    echo "   docker-compose -f docker-compose.prod.yml exec mariadb mysqlcheck -u root -p --repair --all-databases"
    echo ""
    echo "5. Redis memory issues:"
    echo "   docker-compose -f docker-compose.prod.yml exec redis redis-cli FLUSHDB"
    echo "   docker-compose -f docker-compose.prod.yml exec redis redis-cli CONFIG SET maxmemory 128mb"
    echo ""
    echo "6. Database backup/restore:"
    echo "   ./scripts/backup.sh"
    echo "   docker-compose -f docker-compose.prod.yml exec mariadb mysql -u root -p < backup.sql"
}

main() {
    log "Starting Sochi Travel database diagnostics"
    
    {
        echo "SOCHI TRAVEL DATABASE DIAGNOSTICS"
        echo "================================="
        echo "Started: $(date)"
        echo ""
        
    } > "$REPORT_FILE"
    
    check_mariadb_status
    check_mariadb_connectivity
    check_mariadb_performance
    check_mariadb_logs
    check_redis_status
    check_redis_connectivity
    check_redis_performance
    check_redis_logs
    check_database_backups
    check_database_schema
    check_database_permissions
    check_database_connections
    check_database_locks
    generate_database_report
    show_database_fixes
    
    log "Database diagnostics completed! 🗄️"
    
    echo ""
    info "Database Diagnostics Summary:"
    echo "  📊 Report: $REPORT_FILE"
    echo "  📋 Logs: $LOG_FILE"
    echo "  🔧 Auto-repair: $AUTO_REPAIR"
    echo "  📝 Verbose: $VERBOSE"
}

main "$@"
