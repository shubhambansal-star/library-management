import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import { adminRoute, studentRoute, authRoutes } from "./routes/allRoutes"
import Authmiddleware from "./routes/middleware/Authmiddleware"
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import "./assets/scss/theme.scss"
import fakeBackend from "./helpers/AuthType/fakeBackend"
fakeBackend()
const App = props => {
  const StudentLayout = VerticalLayout
  const AdminLayout = HorizontalLayout
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              isAdmin={false}
            />
          ))}
          {adminRoute.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={AdminLayout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              isAdmin={true}
              exact
            />
          ))}
          {studentRoute.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={StudentLayout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              isAdmin={false}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}
App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
