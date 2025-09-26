# Quick Deploy Script for Sochi Travel
# Usage: .\scripts\quick-deploy.ps1 -ServerIP "192.168.1.100"

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [string]$ServerUser = "deploy",
    [string]$Domain = "localhost"
)

Write-Host "🚀 Quick Deploy for Sochi Travel" -ForegroundColor Green
Write-Host "Server: $ServerUser@$ServerIP" -ForegroundColor Blue
Write-Host ""

# Step 1: Build and prepare
Write-Host "📦 Building project..." -ForegroundColor Yellow
.\scripts\build-production.ps1

# Step 2: Prepare deployment
Write-Host "📋 Preparing deployment..." -ForegroundColor Yellow
.\scripts\prepare-deployment.ps1 -ServerIP $ServerIP -ServerUser $ServerUser -Domain $Domain

# Step 3: Deploy to server
Write-Host "🚀 Deploying to server..." -ForegroundColor Yellow
.\scripts\deploy-to-server.ps1 -ServerIP $ServerIP -ServerUser $ServerUser -Domain $Domain

Write-Host ""
Write-Host "✅ Quick deploy completed!" -ForegroundColor Green
Write-Host "🌐 Application: http://$ServerIP" -ForegroundColor Cyan
Write-Host "🔌 API: http://$ServerIP:4000" -ForegroundColor Cyan
