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
import AddBook from "../../src/pages/admin/books/addBook"
import IssueBook from "../../src/pages/admin/books/IssueBook"
import BookList from "../../src/pages/admin/books/bookList"
const adminRoute = [
  { path: "/book-add", component: AddBook },
  { path: "/book-list", component: BookList },
  { path: "/create-account", component: AddBook },
  { path: "/user-list", component: BookList },
  { path: "/issue-book", component: IssueBook },
  { path: "/dashboard", component: BookList },
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
