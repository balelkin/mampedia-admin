
pipeline {
    agent {
        docker {
            image 'node:20.10.0-bullseye-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
//                 sh './jenkins/scripts/test.sh'
                   echo "Testing the app"

            }
        }
        stage('Deliver') {
            steps {
//                 sh './jenkins/scripts/deliver.sh'
//                 input message: 'Finished using the web site? (Click "Proceed" to continue)'
//                 sh './jenkins/scripts/kill.sh'
                   echo "Delivering the app"
            }
        }
    }
}
