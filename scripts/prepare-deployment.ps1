# PowerShell Script for Preparing Sochi Travel Project for Ubuntu Deployment
# Usage: .\scripts\prepare-deployment.ps1

param(
    [string]$ServerIP = "",
    [string]$ServerUser = "deploy",
    [string]$Domain = "localhost"
)

# Colors for output
$Red = "`e[31m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$Blue = "`e[34m"
$Reset = "`e[0m"

# Functions
function Write-Log {
    param([string]$Message, [string]$Color = $Green)
    Write-Host "$Color[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message$Reset"
}

function Write-Warning {
    param([string]$Message)
    Write-Host "$Yellow[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] WARNING: $Message$Reset"
}

function Write-Error {
    param([string]$Message)
    Write-Host "$Red[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] ERROR: $Message$Reset"
    exit 1
}

# Configuration
$ProjectName = "sochi-travel"
$DeployDir = "deploy"
$ArchiveName = "sochi-travel-deployment.zip"
$ServerDir = "/opt/sochi-travel"

Write-Log "Starting deployment preparation for Sochi Travel project"

# 1. Create deployment directory
Write-Log "Creating deployment directory..."
if (Test-Path $DeployDir) {
    Remove-Item -Recurse -Force $DeployDir
}
New-Item -ItemType Directory -Path $DeployDir | Out-Null
New-Item -ItemType Directory -Path "$DeployDir\scripts" | Out-Null
New-Item -ItemType Directory -Path "$DeployDir\monitoring" | Out-Null
New-Item -ItemType Directory -Path "$DeployDir\fail2ban" | Out-Null
New-Item -ItemType Directory -Path "$DeployDir\systemd" | Out-Null

# 2. Copy essential project files
Write-Log "Copying project files..."
$FilesToCopy = @(
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "vite.config.ts",
    "eslint.config.js",
    "docker-compose.yml",
    "docker-compose.prod.yml",
    "Dockerfile.optimized",
    "nginx.production.conf",
    "env.production"
)

foreach ($file in $FilesToCopy) {
    if (Test-Path $file) {
        Copy-Item $file $DeployDir
        Write-Log "Copied: $file"
    } else {
        Write-Warning "File not found: $file"
    }
}

# Copy directories
$DirectoriesToCopy = @(
    "src",
    "apps",
    "public",
    "scripts",
    "monitoring",
    "fail2ban",
    "systemd",
    ".github"
)

foreach ($dir in $DirectoriesToCopy) {
    if (Test-Path $dir) {
        Copy-Item -Recurse $dir $DeployDir
        Write-Log "Copied directory: $dir"
    } else {
        Write-Warning "Directory not found: $dir"
    }
}

# 3. Create production .env file
Write-Log "Creating production .env file..."
$EnvContent = @"
# Database Configuration
DB_ROOT_PASSWORD=SochiTravel2025!SecureRoot
DB_NAME=sochi_travel
DB_USER=sochi_user
DB_PASSWORD=SochiTravel2025!SecureDB
DATABASE_URL=mysql://sochi_user:SochiTravel2025!SecureDB@mariadb:3306/sochi_travel

# Redis Configuration
REDIS_PASSWORD=SochiTravel2025!RedisSecure
REDIS_URL=redis://:SochiTravel2025!RedisSecure@redis:6379/0

# JWT Secrets (64+ character random strings)
JWT_SECRET=SochiTravel2025!JWTSecretKeyForAuthenticationAndSecurityPurposes64Chars
REFRESH_SECRET=SochiTravel2025!RefreshSecretKeyForTokenRenewalAndSecurityPurposes64Chars

# MinIO Configuration
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=SochiTravel2025!MinIOSecure
MINIO_BROWSER_REDIRECT_URL=http://$Domain:9001

# S3 Configuration
S3_BUCKET=sochi-travel-uploads
S3_ENDPOINT=http://minio:9000
S3_ACCESS_KEY=admin
S3_SECRET_KEY=SochiTravel2025!MinIOSecure

# Application Configuration
NODE_ENV=production
API_VERSION=1.0.0
VITE_API_BASE_URL=http://$Domain:4000
VITE_APP_VERSION=1.0.0

# Domain Configuration
DOMAIN=$Domain
SSL_EMAIL=admin@$Domain

# Monitoring (optional)
GRAFANA_PASSWORD=SochiTravel2025!GrafanaSecure

# Build Configuration
BUILD_TIME=$(Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
VITE_BUILD_TIME=$(Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
"@

$EnvContent | Out-File -FilePath "$DeployDir\.env" -Encoding UTF8
Write-Log "Created production .env file"

# 4. Create deployment script for server
Write-Log "Creating server deployment script..."
$DeployScript = @"
#!/bin/bash
# Auto-generated deployment script for Sochi Travel
set -euo pipefail

PROJECT_DIR="/opt/sochi-travel"
BACKUP_DIR="/opt/backups/sochi-travel"

echo "🚀 Starting Sochi Travel deployment..."

# Create directories
mkdir -p `$PROJECT_DIR/{data/{mariadb,redis,minio,prometheus,grafana},logs,backups,secrets}
mkdir -p `$BACKUP_DIR

# Set permissions
chown -R deploy:deploy `$PROJECT_DIR
chown -R deploy:deploy `$BACKUP_DIR

# Copy files
cp -r ./* `$PROJECT_DIR/
chown -R deploy:deploy `$PROJECT_DIR

# Set executable permissions
chmod +x `$PROJECT_DIR/scripts/*.sh

# Create secrets directory
mkdir -p `$PROJECT_DIR/secrets

# Generate secrets if not exist
if [ ! -f `$PROJECT_DIR/secrets/jwt_secret.txt ]; then
    echo "SochiTravel2025!JWTSecretKeyForAuthenticationAndSecurityPurposes64Chars" > `$PROJECT_DIR/secrets/jwt_secret.txt
fi

if [ ! -f `$PROJECT_DIR/secrets/refresh_secret.txt ]; then
    echo "SochiTravel2025!RefreshSecretKeyForTokenRenewalAndSecurityPurposes64Chars" > `$PROJECT_DIR/secrets/refresh_secret.txt
fi

if [ ! -f `$PROJECT_DIR/secrets/db_password.txt ]; then
    echo "SochiTravel2025!SecureDB" > `$PROJECT_DIR/secrets/db_password.txt
fi

chmod 600 `$PROJECT_DIR/secrets/*.txt
chown -R deploy:deploy `$PROJECT_DIR/secrets

echo "✅ Deployment preparation completed!"
echo "Next steps:"
echo "1. cd `$PROJECT_DIR"
echo "2. docker-compose -f docker-compose.prod.yml up -d"
echo "3. Check logs: docker-compose -f docker-compose.prod.yml logs -f"
"@

$DeployScript | Out-File -FilePath "$DeployDir\deploy-to-server.sh" -Encoding UTF8
Write-Log "Created server deployment script"

# 5. Create Windows deployment commands
Write-Log "Creating Windows deployment commands..."
$WindowsCommands = @"
# Windows PowerShell Commands for Sochi Travel Deployment
# Run these commands to deploy to Ubuntu server

# 1. Create deployment archive
Compress-Archive -Path "deploy\*" -DestinationPath "$ArchiveName" -Force

# 2. Copy to server (replace with your server details)
scp $ArchiveName $ServerUser@$ServerIP:/tmp/

# 3. SSH to server and deploy
ssh $ServerUser@$ServerIP "cd /tmp && unzip -o $ArchiveName -d /opt/sochi-travel && chmod +x /opt/sochi-travel/deploy-to-server.sh && /opt/sochi-travel/deploy-to-server.sh"

# 4. Start application
ssh $ServerUser@$ServerIP "cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml up -d"

# 5. Check status
ssh $ServerUser@$ServerIP "cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml ps"
"@

$WindowsCommands | Out-File -FilePath "deploy-commands.ps1" -Encoding UTF8
Write-Log "Created Windows deployment commands"

# 6. Create deployment archive
Write-Log "Creating deployment archive..."
Compress-Archive -Path "$DeployDir\*" -DestinationPath $ArchiveName -Force
Write-Log "Created archive: $ArchiveName"

# 7. Show deployment summary
Write-Log "Deployment preparation completed! 🚀"
Write-Host ""
Write-Host "$Blue=== DEPLOYMENT SUMMARY ===$Reset"
Write-Host "📁 Deployment directory: $DeployDir"
Write-Host "📦 Archive created: $ArchiveName"
Write-Host "📄 Commands file: deploy-commands.ps1"
Write-Host ""
Write-Host "$Yellow=== NEXT STEPS ===$Reset"
Write-Host "1. Review and edit $DeployDir\.env if needed"
Write-Host "2. Run: .\deploy-commands.ps1"
Write-Host "3. Or manually copy files to server"
Write-Host ""
Write-Host "$Green=== MANUAL DEPLOYMENT ===$Reset"
Write-Host "scp $ArchiveName $ServerUser@$ServerIP:/tmp/"
Write-Host "ssh $ServerUser@$ServerIP 'cd /tmp && unzip -o $ArchiveName -d /opt/sochi-travel'"
Write-Host "ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && chmod +x deploy-to-server.sh && ./deploy-to-server.sh'"
Write-Host "ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml up -d'"
Write-Host ""
Write-Host "$Blue=== USEFUL COMMANDS ===$Reset"
Write-Host "View logs: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml logs -f'"
Write-Host "Restart: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml restart'"
Write-Host "Status: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml ps'"
Write-Host "Stop: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml down'"
