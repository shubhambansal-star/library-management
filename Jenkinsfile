pipeline{
  agent any
  stages{
    stage("Build state"){
      steps{
        git branch: 'main', url: 'https://github.com/shubhambansal-star/library-management.git'
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
        echo "deploy successfully"
      }
    }
  }
}