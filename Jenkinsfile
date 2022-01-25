
node{
  checkour scm
  docker.withRegistry('https//registry.hub.docker.com','dockerHub'){
    def customImage = docker.build("app")
    customImage.push()
  }
}
