import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

const PrivateRoute = ({ component: Component, userRole, ...rest }) => {
  const currentUser = useStoreState((state) => state.auth.user)
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn)
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && userRole == currentUser.userRole ? (
          //   <Redirect to={props.location.pathname} />
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
