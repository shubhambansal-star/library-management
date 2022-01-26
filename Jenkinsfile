pipeline{
  agent any
  stages{
    stage("Build state"){
      steps{
        git branch: 'main', url: 'https://github.com/shubhambansal-star/library-management.git'
        sh 'python3 -m pip install virtualenv'
        sh 'python3 -m pip install -r requirements.txt'
        sh 'python3 manage.py test'
        sh 'screen -d -m python3 manage.py runserver 0.0.0.0:4000'
        echo "build successfully"
      }
    }
    stage("Test state"){
      steps{
        echo "test successfully"
      }
    }
    stage("Deploy state"){
      steps{
        sh 'pwd'
        sh 'cd'
        sh 'cd /home/ubuntu/library-management'
        sh 'git pull origin main'
        sh 'source venv/bin/activate'
        sh 'pip3 install -r requirements.txt --no-warn-script-location'
        sh 'python3 manage.py makemigrations'
        sh 'python3 manage.py migrate'
        sh 'deactivate'
        sh 'sudo systemctl restart nginx'
        sh 'sudo systemctl restart gunicorn'
        echo 'done'
      }
    }
  }
}