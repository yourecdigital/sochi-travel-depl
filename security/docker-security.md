# Docker Security Recommendations for Sochi Travel

## 🛡️ Critical Security Issues Found

### 1. **Running as Root User**
**Issue**: Containers running as root (UID 0) have full privileges
**Risk**: Container escape, privilege escalation

**Fix**:
```dockerfile
# Add to Dockerfiles
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser
USER 1001:1001
```

### 2. **Exposed Sensitive Ports**
**Issue**: Database and internal services exposed
**Risk**: Direct access to critical services

**Fix**:
```yaml
# docker-compose.prod.yml
services:
  mariadb:
    ports: [] # Remove external port exposure
  redis:
    ports: [] # Remove external port exposure
```

### 3. **Weak Container Security**
**Issue**: Missing security constraints
**Risk**: Resource abuse, DoS attacks

**Fix**:
```yaml
services:
  api:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
```

## 🔧 Security Hardening Steps

### 1. **Update Dockerfiles**

#### API Dockerfile Security:
```dockerfile
# Use specific version, not latest
FROM node:18.19.0-alpine AS base

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Security: Install security updates
RUN apk upgrade --no-cache

# Security: Set proper permissions
COPY --chown=nextjs:nodejs . .

# Security: Use non-root user
USER nextjs

# Security: Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1
```

#### Web Dockerfile Security:
```dockerfile
FROM nginx:1.25.3-alpine

# Security: Remove unnecessary packages
RUN apk del --purge wget curl

# Security: Create non-root user
RUN addgroup -g 101 -S nginx && \
    adduser -S nginx -u 101 -G nginx

# Security: Set proper permissions
COPY --chown=nginx:nginx dist/ /usr/share/nginx/html/
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Security: Use non-root user
USER nginx

EXPOSE 8080
```

### 2. **Docker Compose Security**

```yaml
version: '3.8'

services:
  api:
    build: ./apps/api
    restart: unless-stopped
    
    # Security: Resource limits
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
    
    # Security: Container hardening
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
    
    # Security: Capabilities
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    
    # Security: User namespace
    user: "1001:1001"
    
    # Security: Network isolation
    networks:
      - backend
    
    # Security: Environment
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    
    # Security: Health check
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  web:
    build: ./apps/web
    restart: unless-stopped
    
    # Security: Resource limits
    deploy:
      resources:
        limits:
          memory: 128M
          cpus: '0.25'
    
    # Security: Container hardening
    security_opt:
      - no-new-privileges:true
    read_only: true
    
    # Security: User
    user: "101:101"
    
    # Security: Networks
    networks:
      - frontend
    
    ports:
      - "80:8080"

  mariadb:
    image: mariadb:10.11.6
    restart: unless-stopped
    
    # Security: No external ports
    ports: []
    
    # Security: Resource limits
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
    
    # Security: Container hardening
    security_opt:
      - no-new-privileges:true
    
    # Security: User
    user: "999:999"
    
    # Security: Networks
    networks:
      - backend
    
    environment:
      - MYSQL_ROOT_PASSWORD_FILE=/run/secrets/db_root_password
      - MYSQL_DATABASE=${DB_NAME}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD_FILE=/run/secrets/db_password
    
    secrets:
      - db_root_password
      - db_password
    
    volumes:
      - mariadb_data:/var/lib/mysql:Z

secrets:
  db_root_password:
    file: ./secrets/db_root_password.txt
  db_password:
    file: ./secrets/db_password.txt

networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  backend:
    driver: bridge
    internal: true
    ipam:
      config:
        - subnet: 172.21.0.0/16

volumes:
  mariadb_data:
    driver: local
```

### 3. **Docker Daemon Security**

Create `/etc/docker/daemon.json`:
```json
{
  "live-restore": true,
  "userland-proxy": false,
  "no-new-privileges": true,
  "seccomp-profile": "/etc/docker/seccomp.json",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 64000,
      "Soft": 64000
    }
  }
}
```

### 4. **Image Security Scanning**

```bash
# Install Trivy scanner
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Scan images for vulnerabilities
trivy image sochi-travel-api:latest
trivy image sochi-travel-web:latest

# Scan filesystem
trivy fs --security-checks vuln,config .
```

### 5. **Container Runtime Security**

```bash
# Use gVisor for enhanced isolation
docker run --runtime=runsc sochi-travel-api

# Or use Kata Containers
docker run --runtime=kata-runtime sochi-travel-api
```

### 6. **Network Security**

```bash
# Create custom bridge network
docker network create --driver bridge \
  --subnet=172.20.0.0/16 \
  --ip-range=172.20.240.0/20 \
  sochi-travel-net

# Use network policies
docker run --network=sochi-travel-net \
  --network-alias=api \
  sochi-travel-api
```

## 🔍 Security Monitoring

### 1. **Container Monitoring**
```bash
# Monitor container resources
docker stats

# Check container processes
docker exec container_name ps aux

# Monitor container logs
docker logs -f container_name
```

### 2. **Security Auditing**
```bash
# Docker Bench Security
docker run --rm -it \
  --pid host \
  --userns host \
  --cap-add audit_control \
  -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
  -v /var/lib:/var/lib \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/lib/systemd:/usr/lib/systemd \
  -v /etc:/etc --label docker_bench_security \
  docker/docker-bench-security
```

## ⚡ Quick Security Fixes

### 1. **Immediate Actions**
```bash
# Update all images
docker-compose pull
docker-compose up -d

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

### 2. **Security Validation**
```bash
# Check running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.RunningFor}}"

# Verify user context
docker exec container_name id

# Check capabilities
docker exec container_name cat /proc/1/status | grep Cap
```

## 📋 Security Checklist

- [ ] All containers run as non-root users
- [ ] Resource limits configured
- [ ] Security options enabled (no-new-privileges)
- [ ] Unnecessary capabilities dropped
- [ ] Read-only root filesystem where possible
- [ ] Secrets managed properly
- [ ] Network segmentation implemented
- [ ] Regular security scans performed
- [ ] Health checks configured
- [ ] Logging and monitoring enabled

## 🚨 Critical Vulnerabilities to Address

1. **CVE-2024-XXXX**: Update Node.js to latest LTS
2. **CVE-2024-YYYY**: Update Nginx to 1.25.3+
3. **CVE-2024-ZZZZ**: Update MariaDB to 10.11.6+

## 📞 Emergency Response

If security breach detected:

1. **Immediate**: Stop affected containers
   ```bash
   docker stop $(docker ps -q)
   ```

2. **Isolate**: Disconnect from network
   ```bash
   docker network disconnect bridge container_name
   ```

3. **Investigate**: Collect logs and evidence
   ```bash
   docker logs container_name > incident_logs.txt
   ```

4. **Rebuild**: Deploy clean images
   ```bash
   docker-compose down
   docker system prune -a
   docker-compose up -d
   ```
