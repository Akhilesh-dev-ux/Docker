pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '638175140757'
        ECR_REPOSITORY = 'employee-backend'
        IMAGE_TAG = 'latest'
        IMAGE_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t employee-backend:latest ./backend'
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin \
                $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh '''
                docker tag employee-backend:latest $IMAGE_URI
                '''
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh '''
                docker push $IMAGE_URI
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop backend-app || true
                docker rm backend-app || true

                docker run -d \
                  --name backend-app \
                  -p 5000:5000 \
                  $IMAGE_URI
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
                sh 'docker images'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
