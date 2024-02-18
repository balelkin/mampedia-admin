pipeline {
    agent any

    environment {
        HEROKU_APP_NAME = 'your-heroku-app-name'
        HEROKU_API_KEY = credentials('your-heroku-api-key')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'your-gitlab-repo-url'
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
