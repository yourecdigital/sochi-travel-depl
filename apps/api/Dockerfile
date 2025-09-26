# Sochi Travel API - Development Dockerfile
FROM node:22-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    ca-certificates

# Copy package files
COPY package*.json ./
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/api ./apps/api
COPY tsconfig.json ./

# Generate Prisma client
RUN cd apps/api && npx prisma generate

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["node", "-e", "fetch('http://localhost:4000/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]

# Start the application
CMD ["node", "apps/api/src/index.js"]