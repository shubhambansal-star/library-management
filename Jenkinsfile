pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh 'pip install -r requirements.txt'
                }
            }
            stage("test build"){
                steps{
                        sh 'python manage.py test'
                }
            }
            stage("deploy app"){
                steps{
                        sh 'screen -d -m python manage.py runserver 0.0.0.0:5500'
                }
            }
        }
}
