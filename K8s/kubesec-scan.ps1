# Define paths to the deployment YAML files
$frontendFile = "/var/lib/jenkins/workspace/Secure-CI-CD-Pipeline/K8s/frontend-deployment.yaml"
$backendFile = "/var/lib/jenkins/workspace/Secure-CI-CD-Pipeline/K8s/backend-deployment.yaml"

# Scan the frontend deployment file
$frontendScanResult = Invoke-RestMethod -Uri "https://v2.kubesec.io/scan" -Method Post -InFile $frontendFile
$frontendScanMessage = $frontendScanResult[0].message
$frontendScanScore = $frontendScanResult[0].score

# Process the frontend scan result
Write-Host "Frontend Scan Message: $frontendScanMessage"
if ($frontendScanScore -ge 5) {
    Write-Host "Frontend Score is $frontendScanScore"
    Write-Host "Kubesec Frontend Scan: $frontendScanMessage"
} else {
    Write-Host "Frontend Score is $frontendScanScore, which is less than or equal to 5."
    Write-Host "Scanning Frontend Kubernetes Resource has Failed"
    exit 1
}

# Scan the backend deployment file
$backendScanResult = Invoke-RestMethod -Uri "https://v2.kubesec.io/scan" -Method Post -InFile $backendFile
$backendScanMessage = $backendScanResult[0].message
$backendScanScore = $backendScanResult[0].score

# Process the backend scan result
Write-Host "Backend Scan Message: $backendScanMessage"
if ($backendScanScore -ge 5) {
    Write-Host "Backend Score is $backendScanScore"
    Write-Host "Kubesec Backend Scan: $backendScanMessage"
} else {
    Write-Host "Backend Score is $backendScanScore, which is less than or equal to 5."
    Write-Host "Scanning Backend Kubernetes Resource has Failed"
    exit 1
}
