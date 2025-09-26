# Sochi Travel API - Security Hardened Production Dockerfile
FROM node:22.19.0-alpine AS base

# Security: Install security updates
RUN apk upgrade --no-cache

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    ca-certificates \
    dumb-init

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY apps/api ./apps/api
COPY tsconfig.json ./

# Security: Set proper permissions
RUN chown -R nextjs:nodejs /app

# Generate Prisma client as non-root user
USER nextjs
RUN cd apps/api && npx prisma generate

# Security: Create tmp directory with proper permissions
RUN mkdir -p /tmp && chmod 1777 /tmp

# Security: Use non-root user
USER nextjs

# Security: Expose non-privileged port
EXPOSE 4000

# Security: Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["node", "-e", "fetch('http://localhost:4000/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]

# Security: Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "apps/api/src/index.js"]