# PowerShell Script for Deploying Sochi Travel to Ubuntu Server
# Usage: .\scripts\deploy-to-server.ps1 -ServerIP "192.168.1.100" -ServerUser "deploy"

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [string]$ServerUser = "deploy",
    [string]$ServerPort = "22",
    [string]$Domain = "localhost",
    [switch]$SkipBuild = $false,
    [switch]$SkipArchive = $false
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

function Test-SSHConnection {
    param([string]$Server, [string]$User, [string]$Port)
    
    try {
        $result = ssh -o ConnectTimeout=10 -o BatchMode=yes -p $Port $User@$Server "echo 'SSH connection successful'" 2>$null
        if ($LASTEXITCODE -eq 0) {
            return $true
        }
    } catch {
        return $false
    }
    return $false
}

Write-Log "Starting deployment to Ubuntu server: $ServerIP"

# 1. Test SSH connection
Write-Log "Testing SSH connection..."
if (-not (Test-SSHConnection -Server $ServerIP -User $ServerUser -Port $ServerPort)) {
    Write-Error "Cannot connect to server $ServerUser@$ServerIP:$ServerPort. Please check SSH keys and connection."
}

Write-Log "SSH connection successful"

# 2. Build project if not skipped
if (-not $SkipBuild) {
    Write-Log "Building project for production..."
    try {
        .\scripts\build-production.ps1
        Write-Log "Project built successfully"
    } catch {
        Write-Error "Build failed: $_"
    }
}

# 3. Prepare deployment if not skipped
if (-not $SkipArchive) {
    Write-Log "Preparing deployment archive..."
    try {
        .\scripts\prepare-deployment.ps1 -ServerIP $ServerIP -ServerUser $ServerUser -Domain $Domain
        Write-Log "Deployment archive prepared"
    } catch {
        Write-Error "Deployment preparation failed: $_"
    }
}

# 4. Copy archive to server
Write-Log "Copying deployment archive to server..."
$ArchiveName = "sochi-travel-deployment.zip"
if (-not (Test-Path $ArchiveName)) {
    Write-Error "Deployment archive not found: $ArchiveName"
}

try {
    scp -P $ServerPort $ArchiveName $ServerUser@$ServerIP:/tmp/
    Write-Log "Archive copied to server"
} catch {
    Write-Error "Failed to copy archive to server: $_"
}

# 5. Deploy on server
Write-Log "Deploying on server..."
$DeployCommands = @"
cd /tmp
if [ -f sochi-travel-deployment.zip ]; then
    echo "Extracting deployment archive..."
    unzip -o sochi-travel-deployment.zip -d /opt/sochi-travel
    chown -R deploy:deploy /opt/sochi-travel
    chmod +x /opt/sochi-travel/deploy-to-server.sh
    /opt/sochi-travel/deploy-to-server.sh
    echo "Deployment preparation completed"
else
    echo "ERROR: Deployment archive not found"
    exit 1
fi
"@

try {
    ssh -p $ServerPort $ServerUser@$ServerIP $DeployCommands
    Write-Log "Deployment preparation completed on server"
} catch {
    Write-Error "Deployment failed on server: $_"
}

# 6. Start application
Write-Log "Starting application on server..."
$StartCommands = @"
cd /opt/sochi-travel
echo "Starting Sochi Travel application..."
docker-compose -f docker-compose.prod.yml down || true
docker-compose -f docker-compose.prod.yml up -d
echo "Application started"
"@

try {
    ssh -p $ServerPort $ServerUser@$ServerIP $StartCommands
    Write-Log "Application started on server"
} catch {
    Write-Error "Failed to start application: $_"
}

# 7. Check deployment status
Write-Log "Checking deployment status..."
$StatusCommands = @"
cd /opt/sochi-travel
echo "=== Docker Services Status ==="
docker-compose -f docker-compose.prod.yml ps
echo ""
echo "=== Application Health ==="
curl -f http://localhost:4000/health || echo "API health check failed"
curl -f http://localhost/ || echo "Web health check failed"
echo ""
echo "=== Recent Logs ==="
docker-compose -f docker-compose.prod.yml logs --tail=20
"@

try {
    ssh -p $ServerPort $ServerUser@$ServerIP $StatusCommands
    Write-Log "Deployment status checked"
} catch {
    Write-Warning "Status check failed: $_"
}

# 8. Show deployment summary
Write-Log "Deployment completed! 🚀"
Write-Host ""
Write-Host "$Blue=== DEPLOYMENT SUMMARY ===$Reset"
Write-Host "🖥️  Server: $ServerUser@$ServerIP:$ServerPort"
Write-Host "📁 Project directory: /opt/sochi-travel"
Write-Host "🌐 Web URL: http://$ServerIP"
Write-Host "🔌 API URL: http://$ServerIP:4000"
Write-Host ""
Write-Host "$Yellow=== USEFUL COMMANDS ===$Reset"
Write-Host "View logs: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml logs -f'"
Write-Host "Restart: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml restart'"
Write-Host "Status: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml ps'"
Write-Host "Stop: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && docker-compose -f docker-compose.prod.yml down'"
Write-Host "Update: ssh $ServerUser@$ServerIP 'cd /opt/sochi-travel && git pull && docker-compose -f docker-compose.prod.yml up -d --build'"
Write-Host ""
Write-Host "$Green=== MONITORING ===$Reset"
Write-Host "Prometheus: http://$ServerIP:9090"
Write-Host "Grafana: http://$ServerIP:3000"
Write-Host "MinIO Console: http://$ServerIP:9001"
Write-Host ""
Write-Host "$Blue=== SECURITY ===$Reset"
Write-Host "Firewall status: ssh $ServerUser@$ServerIP 'sudo ufw status verbose'"
Write-Host "Fail2ban status: ssh $ServerUser@$ServerIP 'sudo fail2ban-client status'"
Write-Host "System logs: ssh $ServerUser@$ServerIP 'sudo journalctl -u sochi-travel -f'"
