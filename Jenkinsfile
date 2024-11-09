pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'git-cred', url: 'https://github.com/KhaledGs5/Secure-CI-CD-Pipeline.git'
            }
        }
        // stage('Sonarqube Analysis') {
        //     steps {
        //         sh """
        //         ${SCANNER_HOME}/bin/sonar-scanner \
        //         -Dsonar.host.url=http://localhost:9000 \
        //         -Dsonar.login=squ_a4bc5f41b84443c6b8aa8f5453c7775407e4647b \
        //         -Dsonar.projectName=Secure-CI-CD-Pipeline \
        //         -Dsonar.java.binaries=. \
        //         -Dsonar.projectKey=Secure-CI-CD-Pipeline \
        //         -X
        //         """
        //     }
        // }
        // stage('Vulnerability Scan - Docker') {
        //     parallel {
        //         stage('OWASP SCAN') {
        //             steps {
        //                 dependencyCheck additionalArguments: ' --scan ./', odcInstallation: 'DP'
        //                 dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        //             }
        //         }
        //         stage('Trivy Scan - Docker') {
        //             steps {
        //                 script {
        //                     // Define the Docker image to be scanned
        //                     def dockerImageName = 'node:20-alpine'
        //                     echo "Scanning Docker Image: ${dockerImageName}"

        //                     // Run Trivy scan for HIGH severity vulnerabilities on the Docker image
        //                     def highScanCommand = "docker run --rm aquasec/trivy:0.17.2 image --exit-code 0 --severity HIGH --light ${dockerImageName}"
        //                     def highScanExitCode = sh(script: highScanCommand, returnStatus: true)

        //                     // Run Trivy scan for CRITICAL severity vulnerabilities on the Docker image
        //                     def criticalScanCommand = "docker run --rm aquasec/trivy:0.17.2 image --exit-code 1 --severity CRITICAL --light ${dockerImageName}"
        //                     def criticalScanExitCode = sh(script: criticalScanCommand, returnStatus: true)

        //                     // Check the scan results for critical vulnerabilities
        //                     if (criticalScanExitCode != 0) {
        //                         // If CRITICAL vulnerabilities are found, fail the pipeline
        //                         error "Image scanning failed. CRITICAL vulnerabilities found."
        //                     } else {
        //                         // If no CRITICAL vulnerabilities are found, check if HIGH vulnerabilities exist
        //                         if (highScanExitCode != 0) {
        //                             echo "HIGH vulnerabilities found, but no CRITICAL vulnerabilities."
        //                         } else {
        //                             echo "Image scanning passed. No HIGH or CRITICAL vulnerabilities found."
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //         stage('OPA Conftest Frontend') {
        //             steps {
        //                 script {
        //                     def workspacePath = env.WORKSPACE.replace('\\', '/') + '/frontend'
        //                     echo "Workspace path: ${workspacePath}"
        //                     def conftestCommand = "docker run --rm -v ${workspacePath}:/frontend openpolicyagent/conftest test --policy /frontend/opa-security.rego /frontend/Dockerfile"
        //                     sh conftestCommand
        //                 }
        //             }
        //         }
        //         stage('OPA Conftest Backend') {
        //             steps {
        //                 script {
        //                     def workspacePath = env.WORKSPACE.replace('\\', '/') + '/nodejs-express-mongodb'
        //                     def conftestCommand = "docker run --rm -v ${workspacePath}:/nodejs-express-mongodb openpolicyagent/conftest test --policy /nodejs-express-mongodb/opa-security.rego /nodejs-express-mongodb/Dockerfile"
        //                     sh conftestCommand
        //                 }
        //             }
        //         }
        //     }
        // }
        // stage('Docker Compose Build and Push') {
        //     steps {
        //         script {
        //             withDockerRegistry(credentialsId: 'docker-cred') {
        //                 // Build the images using docker-compose
        //                 sh "docker-compose build"

        //                 // Push the images to the registry
        //                 sh "docker-compose push"
        //             }
        //         }
        //     }
        // }
        stage('Vulnerability Scan - Kubernetes') {
            parallel {
                stage('OPA conftest') {
                    steps {
                        script {
                            def workspacePath = env.WORKSPACE.replace('\\', '/') + '/K8s'
                            def conftestCommand = "docker run --rm -v ${workspacePath}:/K8s openpolicyagent/conftest test --policy /K8s/opa-k8s-security.rego /K8s/frontend-deployment.yaml"
                            sh conftestCommand
                        }
                    }
                }
                stage('KubeSec Scan') {
                    steps {
                        script {
                            // Run the PowerShell script for KubeSec scanning
                            sh "pwsh -ExecutionPolicy Bypass -File /K8s/kubesec-scan.ps1"
                        }
                    }
                }
                // stage('Trivy Scan - Kubernetes') {
                //     steps {
                //         script {
                //             // Run Trivy scan for HIGH severity vulnerabilities on the Docker image
                //             def highScanCommand = "docker run --rm aquasec/trivy:0.17.2 image --exit-code 0 --severity HIGH --light nadaomri/${DOCKER_IMAGE}:${BUILD_TAG}"
                //             def highScanExitCode = bat(script: highScanCommand, returnStatus: true)

                //             // Run Trivy scan for CRITICAL severity vulnerabilities on the Docker image
                //             def criticalScanCommand = "docker run --rm aquasec/trivy:0.17.2 image --exit-code 0 --severity CRITICAL --light nadaomri/${DOCKER_IMAGE}:${BUILD_TAG}"
                //             def criticalScanExitCode = bat(script: criticalScanCommand, returnStatus: true)

                //             // Check the scan results for critical vulnerabilities
                //             if (criticalScanExitCode != 0) {
                //                 error "Image scanning failed. CRITICAL vulnerabilities found."
                //             } else {
                //                 echo "Image scanning passed. No CRITICAL vulnerabilities found."
                //             }
                //         }
                //     }
                // }
            }
        }
    }
}

