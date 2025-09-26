#!/bin/bash

# Script to setup Docker secrets for production
# Usage: ./scripts/setup-secrets.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Create secrets directory
SECRETS_DIR="./secrets"
mkdir -p "$SECRETS_DIR"

# Function to generate secure random string
generate_secret() {
    local length=${1:-32}
    openssl rand -base64 $length | tr -d "=+/" | cut -c1-${length}
}

# Function to create secret file
create_secret_file() {
    local filename="$1"
    local value="$2"
    
    if [[ -f "$SECRETS_DIR/$filename" ]]; then
        warn "Secret file $filename already exists. Skipping..."
        return
    fi
    
    echo "$value" > "$SECRETS_DIR/$filename"
    chmod 600 "$SECRETS_DIR/$filename"
    log "Created secret file: $filename"
}

log "Setting up Docker secrets for production..."

# Generate JWT secrets
JWT_SECRET=$(generate_secret 64)
REFRESH_SECRET=$(generate_secret 64)

# Generate database password
DB_PASSWORD=$(generate_secret 32)

# Create secret files
create_secret_file "jwt_secret.txt" "$JWT_SECRET"
create_secret_file "refresh_secret.txt" "$REFRESH_SECRET"
create_secret_file "db_password.txt" "$DB_PASSWORD"

# Create .env file with generated secrets
ENV_FILE=".env"
if [[ -f "$ENV_FILE" ]]; then
    warn "Environment file $ENV_FILE already exists. Backing up..."
    cp "$ENV_FILE" "$ENV_FILE.backup.$(date +%Y%m%d_%H%M%S)"
fi

log "Creating environment file with generated secrets..."

cat > "$ENV_FILE" << EOF
# Generated secrets - DO NOT COMMIT TO VERSION CONTROL
JWT_SECRET=$JWT_SECRET
REFRESH_SECRET=$REFRESH_SECRET
DB_PASSWORD=$DB_PASSWORD

# Copy other values from env.production and customize as needed
EOF

# Add .env and secrets/ to .gitignore if not already present
if [[ -f ".gitignore" ]]; then
    if ! grep -q "^\.env$" .gitignore; then
        echo ".env" >> .gitignore
    fi
    if ! grep -q "^secrets/" .gitignore; then
        echo "secrets/" >> .gitignore
    fi
fi

log "Secrets setup completed successfully!"
log "Next steps:"
echo "1. Copy env.production to .env and customize the values"
echo "2. Review and update the generated secrets if needed"
echo "3. Ensure .env and secrets/ are in .gitignore"
echo "4. Run 'docker-compose -f docker-compose.prod.yml up -d'"

warn "IMPORTANT: Never commit .env or secrets/ directory to version control!"

