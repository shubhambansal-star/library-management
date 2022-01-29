import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormUpload from "../pages/Forms/FormUpload"
import FormXeditable from "../pages/Forms/FormXeditable"

// //Extra Pages
import PagesInvoice from "../pages/Extra Pages/pages-invoice"

//bills
import BillForm from "../pages/bills/BillDetails"
import BillToForm from "../pages/bills/BillTo"
import BillByForm from "../pages/bills/BillBy"
import BillByList from "../pages/bills/BillByList"
import BillToList from "../pages/bills/BillToList"
import BillList from "../pages/bills/BillList"
import Dara from "../pages/bills/dara"
const adminRoute = [
  { path: "/book-add", component: PagesInvoice },
  { path: "/book-list", component: PagesInvoice },
  { path: "/create-account", component: BillToForm },
  { path: "/user-list", component: BillByForm },
  { path: "/issue-book", component: BillByList },
  { path: "/dashboard", component: BillByList },
]
const studentRoute = [
  { path: "/issued-book", component: Calendar },
  { path: "/profile", component: UserProfile },
  { path: "/list", component: FormElements },
  { path: "/", exact: true, component: () => <Redirect to="/profile" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/auth-lock-screen", component: LockScreen },
]

export { adminRoute, studentRoute, authRoutes }
