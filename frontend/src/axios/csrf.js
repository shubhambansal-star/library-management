import Cookies from "universal-cookie"
function getCookie(name) {
  const cookies = new Cookies()
  return cookies.get(name)
}

export default getCookie
