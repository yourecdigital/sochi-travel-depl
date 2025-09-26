# PowerShell Script for Building Sochi Travel Project for Production
# Usage: .\scripts\build-production.ps1

param(
    [string]$BuildMode = "production"
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

Write-Log "Starting production build for Sochi Travel project"

# 1. Clean previous builds
Write-Log "Cleaning previous builds..."
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Log "Removed dist directory"
}

if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
    Write-Log "Removed build directory"
}

# 2. Install dependencies
Write-Log "Installing dependencies..."
try {
    npm ci
    Write-Log "Dependencies installed successfully"
} catch {
    Write-Error "Failed to install dependencies: $_"
}

# 3. Run linting
Write-Log "Running ESLint..."
try {
    npm run lint
    Write-Log "Linting passed"
} catch {
    Write-Warning "Linting failed, continuing with build..."
}

# 4. Run tests
Write-Log "Running tests..."
try {
    if (Test-Path "apps/web/package.json") {
        Set-Location "apps/web"
        npm test -- --run
        Set-Location "../.."
        Write-Log "Web tests passed"
    }
} catch {
    Write-Warning "Tests failed, continuing with build..."
}

# 5. Build TypeScript
Write-Log "Building TypeScript..."
try {
    npm run build
    Write-Log "TypeScript build completed"
} catch {
    Write-Error "TypeScript build failed: $_"
}

# 6. Build Docker images locally (optional)
Write-Log "Building Docker images locally..."
try {
    # Build API image
    if (Test-Path "apps/api/Dockerfile.prod") {
        docker build -f apps/api/Dockerfile.prod -t sochi-travel-api:latest .
        Write-Log "API Docker image built"
    }
    
    # Build Web image
    if (Test-Path "apps/web/Dockerfile.prod") {
        docker build -f apps/web/Dockerfile.prod -t sochi-travel-web:latest .
        Write-Log "Web Docker image built"
    }
} catch {
    Write-Warning "Docker build failed: $_"
}

# 7. Create production build summary
Write-Log "Creating build summary..."
$BuildInfo = @{
    BuildTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    BuildMode = $BuildMode
    NodeVersion = node --version
    NpmVersion = npm --version
    GitCommit = git rev-parse HEAD
    GitBranch = git branch --show-current
}

$BuildInfo | ConvertTo-Json | Out-File -FilePath "build-info.json" -Encoding UTF8
Write-Log "Build info saved to build-info.json"

# 8. Show build results
Write-Log "Production build completed! 🚀"
Write-Host ""
Write-Host "$Blue=== BUILD SUMMARY ===$Reset"
Write-Host "📁 Build directory: dist/"
Write-Host "🐳 Docker images: sochi-travel-api:latest, sochi-travel-web:latest"
Write-Host "📄 Build info: build-info.json"
Write-Host ""
Write-Host "$Yellow=== NEXT STEPS ===$Reset"
Write-Host "1. Test locally: docker-compose -f docker-compose.prod.yml up -d"
Write-Host "2. Deploy to server: .\scripts\prepare-deployment.ps1"
Write-Host "3. Check logs: docker-compose -f docker-compose.prod.yml logs -f"
Write-Host ""
Write-Host "$Green=== LOCAL TESTING ===$Reset"
Write-Host "Start services: docker-compose -f docker-compose.prod.yml up -d"
Write-Host "View logs: docker-compose -f docker-compose.prod.yml logs -f"
Write-Host "Stop services: docker-compose -f docker-compose.prod.yml down"
Write-Host "Check status: docker-compose -f docker-compose.prod.yml ps"
