import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess } from "./actions"
import { loginUsers } from "../../../helpers/firebase_helper"
function* loginUser({ payload: { user, history } }) {
  try {
    console.log(1)
    if (process.env.REACT_APP_DEFAULTAUTH === "django") {
      const response = yield call(loginUsers, user)
      localStorage.setItem("authUser", JSON.stringify(response))
      localStorage.setItem("token", response.data.access)
      localStorage.setItem("refresh-token", response.data.refresh)
      localStorage.setItem("email", JSON.stringify(response.data.email))
      if (response.data.admin === true) {
        localStorage.setItem("isAdmin", JSON.stringify(response.data.admin))
      }
      yield put(loginSuccess(response))
      history.push("/")
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
