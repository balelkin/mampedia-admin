pipeline {
    agent any

    environment {
        HEROKU_APP_NAME = 'mampedia-admin-test-jenkins'
        HEROKU_API_KEY = credentials('701b2af7-dced-4765-9962-68bc5d5a6b12')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/balelkin/mampedia-admin.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean install' // або будь-яка інша команда для збірки проекту
            }
        }
        stage('Deploy to Heroku') {
            steps {
                script {
                    def herokuAppName = "${HEROKU_APP_NAME}"
                    def herokuApiKey = "${HEROKU_API_KEY}"

                    withCredentials([string(credentialsId: herokuApiKey, variable: 'HEROKU_API_KEY')]) {
                        sh "heroku login && heroku container:login && heroku container:push web --app ${herokuAppName} && heroku container:release web --app ${herokuAppName}"
                    }
                }
            }
        }
    }
}
