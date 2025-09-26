# Sochi Travel Production Deployment Guide

## 🚀 Complete Production Configuration (2025)

This guide provides a complete production-ready setup for Sochi Travel application with security best practices.

## 📁 Configuration Files Overview

### Environment & Security
- `env.production` - Complete production environment variables
- `nginx.production.conf` - Optimized Nginx with HTTP/3, SSL, caching
- `scripts/setup-security.sh` - Complete security hardening script

### System Services
- `systemd/sochi-travel.service` - Main application service
- `systemd/sochi-travel-backup.service` - Database backup service
- `systemd/sochi-travel-backup.timer` - Automated backup scheduling

### Security & Monitoring
- `fail2ban/` - Custom filters and jail configuration
- `scripts/backup-database.sh` - Comprehensive backup solution
- `monitoring/` - Prometheus & Grafana configurations

## 🔧 Quick Setup Commands

```bash
# 1. Make scripts executable
chmod +x scripts/*.sh

# 2. Setup security (run as non-root user)
./scripts/setup-security.sh

# 3. Generate secrets
./scripts/setup-secrets.sh

# 4. Deploy application
./scripts/deploy-production.sh

# 5. Setup SSL certificates
sudo certbot --nginx -d yourdomain.com

# 6. Start monitoring
docker-compose -f docker-compose.prod.yml up -d
```

## 🔐 Security Features (2025 Best Practices)

### Firewall (UFW)
- Default deny incoming traffic
- Allow only necessary ports (80, 443, 22, 4000)
- Internal monitoring ports restricted

### Fail2Ban Protection
- HTTP authentication failures
- NoScript attacks
- Bad bots and crawlers
- Rate limiting violations
- Custom application filters

### System Hardening
- Kernel security parameters
- AppArmor enabled
- Auditd logging
- Automatic security updates
- Log monitoring with Logwatch

### SSL/TLS Security
- TLS 1.2+ only
- Modern cipher suites
- HSTS with preload
- OCSP stapling
- Let's Encrypt automation

## 📊 Monitoring Stack

### Prometheus Metrics
- Application performance
- System resources
- Database connections
- Redis memory usage
- Custom business metrics

### Grafana Dashboards
- Real-time application health
- Performance metrics
- Error rates and trends
- Resource utilization
- Custom Sochi Travel dashboard

## 💾 Backup Strategy

### Automated Backups
- Daily database backups
- Compressed and encrypted
- 30-day retention policy
- S3 upload option
- Telegram notifications

### Backup Types
- Database (MariaDB dump)
- Upload files (MinIO/S3)
- Configuration files
- SSL certificates

## 🔄 Maintenance Commands

```bash
# View application status
sudo systemctl status sochi-travel

# View logs
sudo journalctl -u sochi-travel -f

# Check security status
sudo ufw status verbose
sudo fail2ban-client status

# Run backup manually
sudo systemctl start sochi-travel-backup

# Update application
git pull && docker-compose -f docker-compose.prod.yml up -d --build
```

## 🚨 Security Alerts

The system includes automated monitoring for:
- Failed login attempts
- High resource usage
- Suspicious network activity
- Container health issues
- Disk space warnings

## 📝 Environment Variables

Key production variables in `env.production`:
- Database credentials (MariaDB)
- Redis configuration
- JWT secrets (64+ characters)
- SSL/TLS settings
- Monitoring configuration
- Backup settings

## 🔍 Troubleshooting

### Common Issues
1. **SSL Certificate**: Use `sudo certbot --nginx`
2. **Firewall**: Check `sudo ufw status verbose`
3. **Containers**: `docker-compose -f docker-compose.prod.yml ps`
4. **Logs**: `sudo journalctl -u sochi-travel -f`

### Health Checks
- Application: `curl https://yourdomain.com/health`
- API: `curl https://yourdomain.com/api/health`
- Database: `docker-compose -f docker-compose.prod.yml exec mariadb mysqladmin ping`

## 📈 Performance Optimization

### Nginx Optimizations
- HTTP/2 and HTTP/3 support
- Gzip/Brotli compression
- Static file caching
- Connection pooling
- Rate limiting

### Application Optimizations
- Multi-stage Docker builds
- Dependency caching
- Resource limits
- Health checks
- Graceful shutdowns

## 🛡️ Security Compliance

This configuration follows:
- OWASP security guidelines
- CIS benchmarks
- NIST cybersecurity framework
- GDPR compliance requirements
- 2025 security best practices

## 📞 Support

For issues or questions:
1. Check logs: `sudo journalctl -u sochi-travel`
2. Review security: `sudo fail2ban-client status`
3. Monitor resources: Grafana dashboard
4. Backup status: `/var/log/sochi-travel-backup.log`

---

**⚠️ Important**: Change all default passwords and secrets before production deployment!

