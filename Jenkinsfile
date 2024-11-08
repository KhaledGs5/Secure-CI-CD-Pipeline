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
            // parallel {
            //     stage('OWASP SCAN') {
            //         steps {
            //             dependencyCheck additionalArguments: ' --scan ./', odcInstallation: 'DP'
            //             dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            //         }
            //     }
                // stage('Trivy Scan - Docker') {
                //     steps {
                //         script {
                //             // Define the Docker image to be scanned
                //             def dockerImageName = 'node:20-alpine'
                //             echo "Scanning Docker Image: ${dockerImageName}"

                //             // Run Trivy scan for HIGH severity vulnerabilities on the Docker image
                //             def highScanCommand = "docker run --rm aquasec/trivy:0.17.2 image --exit-code 0 --severity HIGH --light ${dockerImageName}"
                //             def highScanExitCode = sh(script: highScanCommand, returnStatus: true)

                //             // Run Trivy scan for CRITICAL severity vulnerabilities on the Docker image
                //             def criticalScanCommand = "docker run --rm aquasec/trivy:0.17.2 image --exit-code 1 --severity CRITICAL --light ${dockerImageName}"
                //             def criticalScanExitCode = sh(script: criticalScanCommand, returnStatus: true)

                //             // Check the scan results for critical vulnerabilities
                //             if (criticalScanExitCode != 0) {
                //                 // If CRITICAL vulnerabilities are found, fail the pipeline
                //                 error "Image scanning failed. CRITICAL vulnerabilities found."
                //             } else {
                //                 // If no CRITICAL vulnerabilities are found, check if HIGH vulnerabilities exist
                //                 if (highScanExitCode != 0) {
                //                     echo "HIGH vulnerabilities found, but no CRITICAL vulnerabilities."
                //                 } else {
                //                     echo "Image scanning passed. No HIGH or CRITICAL vulnerabilities found."
                //                 }
                //             }
                //         }
                //     }
                // }
                stage('OPA Conftest') {
                    steps {
                        script {
                            def workspacePath = env.WORKSPACE.replace('\\', '/') + 'frontend'
                            def conftestCommand = "docker run --rm -v ${workspacePath}:/project openpolicyagent/conftest test --policy opa-security.rego Dockerfile"
                            sh conftestCommand
                        }
                    }
                //}
            // }
        }
        // stage('Docker Build and Push') {
        //     steps {
        //         script {
        //             withDockerRegistry(credentialsId: 'docker-cred') {
        //                 sh "docker build -t khaledgs/fixprostho ."
        //                 sh "docker push khaledgs/fixprostho"
        //             }
        //         }
        //     }
        // }
    }
}

