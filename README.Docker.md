# 🐳 Docker Configuration for Sochi Travel

## 📋 Overview

This document provides comprehensive instructions for deploying Sochi Travel using Docker in production environments.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (Web)   │    │   API (Node.js) │    │   MariaDB       │
│   Port: 80/443  │◄──►│   Port: 4000    │◄──►│   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐    ┌─────────────────┐
         │              │   Redis Cache   │    │   MinIO S3      │
         │              │   Port: 6379    │    │   Port: 9000    │
         │              └─────────────────┘    └─────────────────┘
         │
┌─────────────────┐    ┌─────────────────┐
│   Prometheus    │    │   Grafana       │
│   Port: 9090    │◄──►│   Port: 3000    │
└─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### 1. Prerequisites

```bash
# Ubuntu 22.04
sudo apt update
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. Setup Secrets

```bash
# Generate secure secrets
./scripts/setup-secrets.sh

# Copy and customize environment
cp env.production .env
nano .env  # Edit with your values
```

### 3. Deploy

```bash
# Basic deployment
./scripts/deploy-production.sh

# With monitoring
./scripts/deploy-production.sh --with-monitoring
```

## 📁 File Structure

```
├── docker-compose.prod.yml          # Production compose file
├── apps/
│   ├── web/
│   │   ├── Dockerfile.prod          # Optimized web Dockerfile
│   │   └── nginx.conf               # Nginx configuration
│   └── api/
│       └── Dockerfile.prod          # Optimized API Dockerfile
├── scripts/
│   ├── deploy-production.sh         # Main deployment script
│   ├── setup-secrets.sh             # Secret generation
│   ├── mysql-prod.cnf               # MySQL production config
│   ├── redis-prod.conf              # Redis production config
│   └── minio-init.sh                # MinIO initialization
├── monitoring/
│   ├── prometheus.yml               # Prometheus configuration
│   └── grafana/                     # Grafana dashboards
├── env.production                   # Production environment template
└── nginx.production.conf            # Production nginx config
```

## 🔧 Configuration

### Environment Variables

Key environment variables in `.env`:

```bash
# Database
DB_ROOT_PASSWORD=your_secure_password
DB_PASSWORD=your_secure_password

# JWT Secrets (auto-generated)
JWT_SECRET=auto_generated_64_char_secret
REFRESH_SECRET=auto_generated_64_char_secret

# Redis
REDIS_PASSWORD=your_secure_password

# MinIO/S3
MINIO_ROOT_PASSWORD=your_secure_password
S3_BUCKET=sochi-travel-uploads

# Domain
DOMAIN=yourdomain.com
SSL_EMAIL=admin@yourdomain.com
```

### Docker Compose Profiles

```bash
# Basic services only
docker-compose -f docker-compose.prod.yml up -d

# With monitoring
docker-compose -f docker-compose.prod.yml --profile monitoring up -d
```

## 🛠️ Optimization Features

### 1. Multi-stage Builds

- **Dependencies Stage**: Separate layer for npm dependencies
- **Build Stage**: Optimized build process with caching
- **Runtime Stage**: Minimal production images

### 2. Caching Strategy

```dockerfile
# npm cache mount
RUN --mount=type=cache,target=/root/.npm npm ci

# Build cache
RUN --mount=type=cache,target=/app/.next/cache npm run build
```

### 3. Health Checks

All services include comprehensive health checks:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 15s
```

### 4. Resource Limits

```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
    reservations:
      memory: 256M
      cpus: '0.25'
```

### 5. Logging Configuration

```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "5"
```

## 📊 Monitoring

### Prometheus Metrics

- **API Metrics**: `/metrics` endpoint
- **System Metrics**: Node exporter
- **Database Metrics**: MariaDB exporter
- **Cache Metrics**: Redis exporter

### Grafana Dashboards

- Application performance
- Database metrics
- System resources
- Error rates and latency

### Access Monitoring

```bash
# Prometheus
http://localhost:9090

# Grafana (admin / password from .env)
http://localhost:3000
```

## 🔒 Security Features

### 1. Non-root Users

```dockerfile
# API uses distroless nonroot user
FROM gcr.io/distroless/nodejs22-debian12:nonroot
USER nonroot

# Web uses custom nginx user
USER nextjs
```

### 2. Secrets Management

```yaml
secrets:
  jwt_secret:
    file: ./secrets/jwt_secret.txt
  db_password:
    file: ./secrets/db_password.txt
```

### 3. Network Isolation

```yaml
networks:
  sochi-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### 4. Security Headers

```nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000";
```

## 💾 Data Persistence

### Volumes

```yaml
volumes:
  mariadb_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/sochi-travel/data/mariadb
```

### Backup Strategy

```bash
# Automated backups
./scripts/backup-database.sh

# Manual backup
docker-compose exec mariadb mysqldump -u root -p sochi_travel > backup.sql
```

## 🚀 Deployment Commands

### Basic Operations

```bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Stop services
docker-compose -f docker-compose.prod.yml down

# Update services
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### Maintenance

```bash
# Clean up unused images
docker image prune -f

# Clean up unused volumes
docker volume prune -f

# System cleanup
docker system prune -f
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   sudo netstat -tulpn | grep :80
   ```

2. **Permission Issues**
   ```bash
   # Fix directory permissions
   sudo chown -R $USER:$USER /opt/sochi-travel
   ```

3. **Health Check Failures**
   ```bash
   # Check service logs
   docker-compose logs api
   docker-compose logs web
   ```

4. **Database Connection Issues**
   ```bash
   # Test database connection
   docker-compose exec api node -e "console.log('DB test')"
   ```

### Debug Commands

```bash
# Enter container
docker-compose exec api sh
docker-compose exec web sh

# Check service status
docker-compose ps

# View resource usage
docker stats

# Check logs
docker-compose logs --tail=100 -f api
```

## 📈 Performance Tuning

### Database Optimization

```sql
-- MariaDB tuning
SET GLOBAL innodb_buffer_pool_size = 256M;
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 64M;
```

### Redis Optimization

```conf
# Redis memory management
maxmemory 128mb
maxmemory-policy allkeys-lru
```

### Nginx Optimization

```nginx
# Worker processes
worker_processes auto;
worker_connections 1024;

# Gzip compression
gzip on;
gzip_comp_level 6;
```

## 🔄 Updates and Maintenance

### Rolling Updates

```bash
# Update API only
docker-compose -f docker-compose.prod.yml up -d --no-deps api

# Update web only
docker-compose -f docker-compose.prod.yml up -d --no-deps web
```

### Database Migrations

```bash
# Run Prisma migrations
docker-compose exec api npx prisma migrate deploy

# Generate Prisma client
docker-compose exec api npx prisma generate
```

## 📞 Support

For issues and questions:

1. Check logs: `docker-compose logs -f`
2. Verify health: `curl http://localhost/health`
3. Check resources: `docker stats`
4. Review configuration: `.env` file

## 🎯 Best Practices

1. **Always use secrets management**
2. **Regular database backups**
3. **Monitor resource usage**
4. **Keep images updated**
5. **Use health checks**
6. **Implement logging**
7. **Network security**
8. **Regular maintenance**

