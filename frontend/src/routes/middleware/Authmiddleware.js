import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  isAdmin,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      } else if (isAuthProtected && localStorage.getItem("authUser")) {
        if (isAdmin && localStorage.getItem("isAdmin")) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        } else if (isAdmin && !localStorage.getItem("isAdmin")) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        } else if (!isAdmin && localStorage.getItem("isAdmin")) {
          return (
            <Redirect
              to={{ pathname: "/dashboard", state: { from: props.location } }}
            />
          )
        } else if (!isAdmin && !localStorage.getItem("isAdmin")) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          )
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
