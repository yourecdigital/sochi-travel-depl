# Sochi Travel Web - Development Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    ca-certificates

# Copy package files
COPY package*.json ./
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/web ./apps/web
COPY tsconfig.json ./
COPY vite.config.ts ./

# Build the application
RUN cd apps/web && npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["curl", "-f", "http://localhost/"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]