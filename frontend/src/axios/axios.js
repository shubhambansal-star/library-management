import axios from "axios"
axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
export default axios.create({
  baseURL: "http://3.21.19.227/",
  

})
