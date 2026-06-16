// Jenkins Pipeline untuk Portfolio dengan Test Pyramid Strategy
// Simple configuration untuk learning CI/CD dengan Jenkins + SonarQube

pipeline {
  agent any

  tools {
    nodejs 'NodeJS-20'  // Configure in Jenkins: Manage Jenkins > Tools > NodeJS
  }

  environment {
    SCANNER_HOME = tool 'SonarQube Scanner'
    SONAR_HOST_URL = credentials('sonar-host-url')  // Add in Jenkins Credentials
    SONAR_TOKEN = credentials('sonar-token')        // Add in Jenkins Credentials
    PRODUCTION_SERVER_IP = '192.168.1.100'          // Change to your production server IP
  }

  stages {
    // 1. Get Source Code
    stage('Checkout') {
      steps {
        checkout scm
        echo '✓ Source code checked out'
      }
    }

    // 2. Setup Dependencies
    stage('Setup') {
      steps {
        sh '''
          npm install -g pnpm@10.32.1
          pnpm install --frozen-lockfile
        '''
        echo '✓ Dependencies installed'
      }
    }

    // 3. Code Quality Check
    stage('Lint') {
      steps {
        sh 'pnpm lint'
        echo '✓ Lint passed'
      }
    }

    // 4. Test Pyramid - Unit & Integration (70% + 20%)
    stage('Unit & Integration Tests') {
      steps {
        sh 'pnpm run test:ci:no-e2e'
        echo '✓ Unit & Integration tests passed'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'coverage/junit.xml'
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'coverage/lcov-report',
            reportFiles: 'index.html',
            reportName: 'Coverage Report'
          ])
        }
      }
    }

    // 5. Test Pyramid - E2E Tests (10%) - Optional
    stage('E2E Tests') {
      when {
        branch 'main'  // Only on main branch
      }
      steps {
        script {
          // Skip E2E if browsers not available (for learning, this is OK)
          sh '''
            echo "E2E tests skipped in CI (run locally with: pnpm test:e2e)"
            echo "✓ E2E tests stage completed"
          '''
        }
      }
    }

    // 6. SonarQube Code Analysis
    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh '''
            ${SCANNER_HOME}/bin/sonar-scanner \
              -Dsonar.projectKey=bypur-portfolio \
              -Dsonar.sources=. \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
          '''
        }
        echo '✓ SonarQube analysis completed'
      }
    }

    // 7. Quality Gate Check
    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
        echo '✓ Quality gate passed'
      }
    }

    // 8. Build Application
    stage('Build') {
      steps {
        sh 'pnpm build'
        echo '✓ Build completed'
      }
      post {
        success {
          archiveArtifacts artifacts: '.next/**/*', fingerprint: true
        }
      }
    }

    // 9. Deploy to VPS
    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        script {
          withCredentials([sshUserPrivateKey(
            credentialsId: 'vps-ssh-key',
            keyFileVariable: 'SSH_KEY',
            usernameVariable: 'SSH_USER'
          )]) {
            sh '''
              # Create deployment package
              tar -czf deploy.tar.gz .next public package.json pnpm-lock.yaml Dockerfile docker-compose.yml
              
              # Upload to VPS
              scp -i $SSH_KEY -o StrictHostKeyChecking=no deploy.tar.gz ${SSH_USER}@${PRODUCTION_SERVER_IP}:/tmp/
              
              # Deploy on VPS
              ssh -i $SSH_KEY -o StrictHostKeyChecking=no ${SSH_USER}@${PRODUCTION_SERVER_IP} << 'ENDSSH'
                cd /var/www/bypur-portfolio
                
                # Backup current version
                [ -d ".next" ] && tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz .next public
                
                # Extract and deploy
                tar -xzf /tmp/deploy.tar.gz
                rm /tmp/deploy.tar.gz
                
                # Restart containers
                docker-compose down
                docker-compose up -d --build
                docker image prune -af
                
                # Health check
                sleep 5
                docker-compose ps | grep -q "Up" && echo "Deployment successful" || exit 1
ENDSSH
            '''
          }
          echo '✓ Deployed to VPS'
        }
      }
    }
  }

  // Post-build Actions
  post {
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed! Check the logs above.'
    }
    always {
      cleanWs()  // Clean workspace after build
    }
  }
}
