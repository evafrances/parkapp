import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthStore'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {(props) => {
      console.log(props)
      return (
        <Route render={
          routeProps => props.isAuthenticated() ? 
            <Component {...props} { ...routeProps } /> : 
            <Redirect to="/login" />
        } {...rest} />
      )
    }}
  </AuthContext.Consumer>
)

export default PrivateRoute
