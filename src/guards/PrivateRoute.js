import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthStore'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated}) => (
      <Route render={
        props => isAuthenticated() ? 
          <Component {...props}/> : 
          <Redirect to="/login" />
      } {...rest} />
    )}
  </AuthContext.Consumer>
)

export default PrivateRoute
