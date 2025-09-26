# Sochi Travel - Diagnostic Scripts

This directory contains comprehensive diagnostic scripts for troubleshooting and maintaining the Sochi Travel application.

## 📋 Available Scripts

### 1. Docker Diagnostics (`docker-diagnostics.sh`)
**Purpose**: Diagnose Docker-related issues and container problems.

**Usage**:
```bash
# Basic diagnostics
./diagnostics/docker-diagnostics.sh

# Verbose output
./diagnostics/docker-diagnostics.sh --verbose

# Auto-fix common issues
./diagnostics/docker-diagnostics.sh --fix
```

**Features**:
- ✅ Docker daemon status check
- ✅ Container health monitoring
- ✅ Resource usage analysis
- ✅ Image and volume inspection
- ✅ Network connectivity tests
- ✅ Log analysis for errors
- ✅ Permission and disk space checks
- ✅ Automated fixes for common issues

### 2. Network Diagnostics (`network-diagnostics.sh`)
**Purpose**: Analyze network connectivity and performance issues.

**Usage**:
```bash
# Basic network diagnostics
./diagnostics/network-diagnostics.sh

# Verbose output with detailed analysis
./diagnostics/network-diagnostics.sh --verbose

# Test all network components
./diagnostics/network-diagnostics.sh --test-all
```

**Features**:
- ✅ Docker network inspection
- ✅ Container-to-container connectivity
- ✅ External connectivity tests
- ✅ Port accessibility checks
- ✅ Firewall rule analysis
- ✅ DNS resolution tests
- ✅ Network performance monitoring
- ✅ SSL certificate validation
- ✅ Application endpoint testing

### 3. Database Diagnostics (`database-diagnostics.sh`)
**Purpose**: Diagnose database-related issues and performance problems.

**Usage**:
```bash
# Basic database diagnostics
./diagnostics/database-diagnostics.sh

# Verbose output with detailed analysis
./diagnostics/database-diagnostics.sh --verbose

# Auto-repair common database issues
./diagnostics/database-diagnostics.sh --repair
```

**Features**:
- ✅ MariaDB status and connectivity
- ✅ Redis status and connectivity
- ✅ Database performance metrics
- ✅ Connection monitoring
- ✅ Lock analysis
- ✅ Schema validation
- ✅ Backup verification
- ✅ Log analysis for errors
- ✅ Automated repairs

### 4. Performance Analysis (`performance-analysis.sh`)
**Purpose**: Analyze system and application performance.

**Usage**:
```bash
# Basic performance analysis
./diagnostics/performance-analysis.sh

# Verbose output with detailed metrics
./diagnostics/performance-analysis.sh --verbose

# Extended monitoring (10 minutes)
./diagnostics/performance-analysis.sh --duration=600
```

**Features**:
- ✅ System resource monitoring (CPU, Memory, Disk)
- ✅ Container performance analysis
- ✅ Application response time testing
- ✅ Database performance metrics
- ✅ Network performance analysis
- ✅ Real-time monitoring
- ✅ Performance recommendations
- ✅ Automated performance reports

### 5. Logs Debug (`logs-debug.sh`)
**Purpose**: Analyze application logs for debugging issues.

**Usage**:
```bash
# Basic log analysis
./diagnostics/logs-debug.sh

# Follow logs in real-time
./diagnostics/logs-debug.sh --follow

# Analyze specific service
./diagnostics/logs-debug.sh --service=api

# Analyze logs from last 2 hours
./diagnostics/logs-debug.sh --since=2h
```

**Features**:
- ✅ Docker container log analysis
- ✅ System log inspection
- ✅ Nginx log analysis
- ✅ Database log monitoring
- ✅ Application log debugging
- ✅ Error pattern detection
- ✅ Real-time log following
- ✅ Log search and filtering

### 6. Emergency Procedures (`emergency-procedures.sh`)
**Purpose**: Handle emergency situations with quick fixes and rollbacks.

**Usage**:
```bash
# Show available emergency commands
./diagnostics/emergency-procedures.sh

# Restart all services
./diagnostics/emergency-procedures.sh --action=restart

# Restart specific service
./diagnostics/emergency-procedures.sh --action=restart --service=api

# Rollback all services
./diagnostics/emergency-procedures.sh --action=rollback

# Create emergency backup
./diagnostics/emergency-procedures.sh --action=backup

# Restore from backup
./diagnostics/emergency-procedures.sh --action=restore
```

**Features**:
- ✅ Emergency backup creation
- ✅ Service restart procedures
- ✅ Rollback mechanisms
- ✅ Backup restoration
- ✅ Service status verification
- ✅ Automated recovery
- ✅ Emergency command reference

## 🚀 Quick Start

### 1. Make Scripts Executable
```bash
chmod +x diagnostics/*.sh
```

### 2. Run Full Diagnostics
```bash
# Run all diagnostic scripts
./diagnostics/docker-diagnostics.sh
./diagnostics/network-diagnostics.sh
./diagnostics/database-diagnostics.sh
./diagnostics/performance-analysis.sh
./diagnostics/logs-debug.sh
```

### 3. Emergency Procedures
```bash
# Create emergency backup
./diagnostics/emergency-procedures.sh --action=backup

# Restart all services
./diagnostics/emergency-procedures.sh --action=restart

# Rollback if needed
./diagnostics/emergency-procedures.sh --action=rollback
```

## 📊 Reports and Logs

All diagnostic scripts generate detailed reports and logs:

- **Reports**: `/tmp/diagnostics-*.txt`
- **Logs**: `/var/log/sochi-travel-*.log`
- **Backups**: `/opt/backups/sochi-travel/`
- **Rollbacks**: `/opt/rollbacks/sochi-travel/`

## 🔧 Common Issues and Solutions

### Docker Issues
```bash
# Container not starting
./diagnostics/docker-diagnostics.sh --fix

# Out of disk space
docker system prune -a

# Permission denied
sudo usermod -aG docker $USER
```

### Network Issues
```bash
# Network connectivity problems
./diagnostics/network-diagnostics.sh --test-all

# Port not accessible
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 4000
```

### Database Issues
```bash
# Database connection problems
./diagnostics/database-diagnostics.sh --repair

# Database performance issues
docker-compose -f docker-compose.prod.yml exec mariadb mysql -e "OPTIMIZE TABLE table_name;"
```

### Performance Issues
```bash
# Performance analysis
./diagnostics/performance-analysis.sh --duration=600

# High resource usage
docker stats
```

### Log Issues
```bash
# Follow logs in real-time
./diagnostics/logs-debug.sh --follow

# Search for specific errors
./diagnostics/logs-debug.sh --service=api
```

## 🚨 Emergency Procedures

### Quick Restart
```bash
# Restart all services
./diagnostics/emergency-procedures.sh --action=restart

# Restart specific service
./diagnostics/emergency-procedures.sh --action=restart --service=api
```

### Rollback
```bash
# Rollback all services
./diagnostics/emergency-procedures.sh --action=rollback

# Rollback specific service
./diagnostics/emergency-procedures.sh --action=rollback --service=web
```

### Backup and Restore
```bash
# Create emergency backup
./diagnostics/emergency-procedures.sh --action=backup

# Restore from backup
./diagnostics/emergency-procedures.sh --action=restore
```

## 📈 Monitoring and Alerts

### Automated Monitoring
```bash
# Set up automated diagnostics
crontab -e

# Add these lines:
# Run diagnostics every hour
0 * * * * /opt/sochi-travel/diagnostics/docker-diagnostics.sh
# Run performance analysis every 6 hours
0 */6 * * * /opt/sochi-travel/diagnostics/performance-analysis.sh
# Run database diagnostics every 12 hours
0 */12 * * * /opt/sochi-travel/diagnostics/database-diagnostics.sh
```

### Alert Integration
```bash
# Send alerts to Telegram
./diagnostics/docker-diagnostics.sh | grep "ERROR" | curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" -d "chat_id=$TELEGRAM_CHAT_ID&text=Sochi Travel Alert: $1"
```

## 🛠️ Troubleshooting

### Script Permissions
```bash
chmod +x diagnostics/*.sh
```

### Missing Dependencies
```bash
# Install required tools
sudo apt update
sudo apt install -y curl jq bc netstat-ng iperf3
```

### Docker Issues
```bash
# Restart Docker daemon
sudo systemctl restart docker

# Check Docker status
sudo systemctl status docker
```

### Network Issues
```bash
# Check network configuration
ip addr show
ip route show

# Test connectivity
ping 8.8.8.8
nslookup google.com
```

## 📚 Additional Resources

- **Docker Documentation**: https://docs.docker.com/
- **MariaDB Documentation**: https://mariadb.org/documentation/
- **Redis Documentation**: https://redis.io/documentation
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Systemd Documentation**: https://systemd.io/

## 🔍 Debugging Tips

1. **Always check logs first**: `./diagnostics/logs-debug.sh --follow`
2. **Monitor performance**: `./diagnostics/performance-analysis.sh --duration=300`
3. **Check network connectivity**: `./diagnostics/network-diagnostics.sh --test-all`
4. **Verify database health**: `./diagnostics/database-diagnostics.sh --verbose`
5. **Use emergency procedures**: `./diagnostics/emergency-procedures.sh --action=restart`

## 📞 Support

If you encounter issues with the diagnostic scripts:

1. Check the logs: `/var/log/sochi-travel-*.log`
2. Review the reports: `/tmp/diagnostics-*.txt`
3. Run verbose diagnostics: `./diagnostics/*.sh --verbose`
4. Use emergency procedures: `./diagnostics/emergency-procedures.sh`

---

**Note**: These diagnostic scripts are designed for the Sochi Travel application. Make sure to run them from the project directory (`/opt/sochi-travel`) and ensure all required services are running.
