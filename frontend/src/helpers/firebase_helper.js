import { doPost } from "../axios/restutils"
const loginUsers = async user => {
  const tableCont = await doPost("api/token/", user)
  return tableCont
}

export { loginUsers }
