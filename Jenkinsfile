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
        sh 'ssh -o StrictHostKeyChecking=no deployment-user@3.21.19.227 "cd library-management;\
        source venv/bin/activate;\
        git pull origin main;\
        pip install -r requirements.txt --no-warn-script-location;\
        python manage.py makemigrations;\
        python manage.py migrate;\
        python manage.py collectstatic;\
        deactivate;\
        sudo systemctl restart nginx;\
        sudo systemctl restart gunicorn"'
        echo 'done'
      }
    }
  }
}