node{
  checkour scm
  docker.withRegistry('https//registry.hub.docker.com','dockerHub'){
    def customImage = docker.build("shubhban29/library")
    customImage.push()
  }
}
