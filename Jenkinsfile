pipeline {
    agent any
    tools { nodejs 'NodeJS-24' }
    options {
        timestamps()
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
    }
    environment {
        LOCAL_BACKEND_IMAGE  = 'proyecto-3-backend'
        LOCAL_FRONTEND_IMAGE = 'proyecto-3-frontend'
        REMOTE_BACKEND_IMAGE  = 'karen30/practica2-backend'
        REMOTE_FRONTEND_IMAGE = 'karen30/practica2-frontend'
        RAILWAY_PROJECT_ID = '6c759af0-9895-4a99-8b00-bf4642281129'
        RAILWAY_ENVIRONMENT_ID = 'efdd7c0a-1fa7-4d3a-89d0-f7647e948c4c'
        RAILWAY_BACKEND_SERVICE_ID = '5c52cc15-b575-488a-969e-c35bacee17c0'
        RAILWAY_FRONTEND_SERVICE_ID = '4c049b51-26d5-4b82-bf0b-2534c80c888c'
    }
   
}
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Backend - Install') { steps { dir('backend') { sh 'npm ci' } } }
        stage('Backend - Prisma') { steps { dir('backend') { sh 'npx prisma generate' } } }
        stage('Backend - Test') { steps { dir('backend') { sh 'npm test' } } }
        stage('Frontend - Install') { steps { dir('frontend') { sh 'npm ci --legacy-peer-deps' } } }
        stage('Frontend - Lint') { steps { dir('frontend') { sh 'npm run lint' } } }
        stage('Frontend - Build') { steps { dir('frontend') { sh 'npm run build' } } }
        stage('Docker - Validate') { steps { sh 'docker compose config --quiet' } }
        stage('Docker - Build') { steps { sh 'docker compose build --no-cache' } }
        stage('Docker - Verify Images') {
            steps {
                sh '''
                    docker image inspect proyecto-3-backend:latest
                    docker image inspect proyecto-3-frontend:latest
                    echo "Imágenes verificadas correctamente."
                '''
            }
        }
        stage('Docker - Publish') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'jenkins-u3', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        set -eu
                        export DOCKER_CONFIG="$(mktemp -d)"
                        trap 'rm -rf "$DOCKER_CONFIG"' EXIT
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag "${LOCAL_BACKEND_IMAGE}:latest" "${REMOTE_BACKEND_IMAGE}:latest"
                        docker tag "${LOCAL_BACKEND_IMAGE}:latest" "${REMOTE_BACKEND_IMAGE}:${BUILD_NUMBER}"
                        docker tag "${LOCAL_FRONTEND_IMAGE}:latest" "${REMOTE_FRONTEND_IMAGE}:latest"
                        docker tag "${LOCAL_FRONTEND_IMAGE}:latest" "${REMOTE_FRONTEND_IMAGE}:${BUILD_NUMBER}"
                        docker push "${REMOTE_BACKEND_IMAGE}:latest"
                        docker push "${REMOTE_BACKEND_IMAGE}:${BUILD_NUMBER}"
                        docker push "${REMOTE_FRONTEND_IMAGE}:latest"
                        docker push "${REMOTE_FRONTEND_IMAGE}:${BUILD_NUMBER}"
                        docker logout
                    '''
                }
            }
        }
        stage('Railway - CLI Check') { steps { sh 'npx -y @railway/cli --version' } }
        stage('Railway - Redeploy Backend') {
            steps {
                withCredentials([string(credentialsId: 'railway-token', variable: 'RAILWAY_TOKEN')]) {
                    sh 'npx -y @railway/cli redeploy --service "$RAILWAY_BACKEND_SERVICE_ID" --environment "$RAILWAY_ENVIRONMENT_ID" --yes'
                }
            }
        }
        stage('Railway - Redeploy Frontend') {
            steps {
                withCredentials([string(credentialsId: 'railway-token', variable: 'RAILWAY_TOKEN')]) {
                    sh 'npx -y @railway/cli redeploy --service "$RAILWAY_FRONTEND_SERVICE_ID" --environment "$RAILWAY_ENVIRONMENT_ID" --yes'
                }
            }
        }
    }
    post {
        success { echo 'PIPELINE SATISFACTORIO' }
        failure { echo 'PIPELINE FALLIDO - Revisar Console Output' }
        always { sh 'docker logout >/dev/null 2>&1 || true' }
    }
}