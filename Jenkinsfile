pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-u root'
        }
    }
    environment {
        VITE_APP_PB_URL = "https://api.elykp.com"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'yarn'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
        stage('Build and compress') {
            steps {
                sh 'yarn build'
                sh 'tar -czvf dist.tar.gz dist/'
            }
        }
        stage('Copy artifacts to VPS') {
            steps {
                sshPublisher(
                    continueOnError: false, 
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: "elykp.com",
                            transfers: [sshTransfer(
                                sourceFiles: 'dist.tar.gz', 
                                remoteDirectory: "elykp", 
                                cleanRemote: true, 
                                execCommand: "tar -xzvf ~/elykp/dist.tar.gz -C ~/elykp"
                                )
                            ],
                            verbose: true,
                        )
                    ]
                )
            }
        }
    }

    post {
        failure {
            emailext to: "blackparadise0407@gmail.com",
            subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
            body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}"
        }
    }
}