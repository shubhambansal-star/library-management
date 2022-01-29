import { combineReducers } from "redux"
import Layout from "./layout/reducer"
import Breadcrumb from "./Breadcrumb/reducer"
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"
import calendar from "./calendar/reducer"
import loaderReducer from "./loading/reducer"
import ErrorReducer from "./error/reducer"
const rootReducer = combineReducers({
  Layout,
  loaderReducer,
  Breadcrumb,
  Login,
  Profile,
  calendar,
  ErrorReducer,
})

export default rootReducer
