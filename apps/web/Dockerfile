# Sochi Travel Web - Security Hardened Production Dockerfile
FROM node:22.19.0-alpine AS builder

WORKDIR /app

# Security: Install security updates
RUN apk upgrade --no-cache

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    ca-certificates

# Security: Create non-root user for build
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy package files
COPY package*.json ./
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY apps/web ./apps/web
COPY tsconfig.json ./
COPY vite.config.ts ./

# Security: Set proper permissions
RUN chown -R nextjs:nodejs /app

# Build the application as non-root user
USER nextjs
RUN cd apps/web && npm run build

# Production stage - Security Hardened
FROM nginx:1.25.3-alpine

# Security: Install security updates
RUN apk upgrade --no-cache

# Security: Remove unnecessary packages
RUN apk del --purge wget curl

# Security: Create non-root user
RUN addgroup -g 101 -S nginx && \
    adduser -S nginx -u 101 -G nginx

# Security: Set proper permissions
COPY --from=builder --chown=nginx:nginx /app/apps/web/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Security: Create necessary directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run /usr/share/nginx/html

# Security: Use non-root user
USER nginx

# Security: Expose non-privileged port
EXPOSE 8080

# Security: Health check with proper user
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/health"]

# Security: Start nginx as non-root
CMD ["nginx", "-g", "daemon off;"]