import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, user, getUser, ...rest }) => {
    
    return (
      <Route
        {...rest}
        render={(props) => {
          // Check if there is some user logged in already
          // Return the component associated to the url if successful or redirect if not
          if (user) {
            return <Component {...props} loggedInUser={user} getUser={getUser}/>;
          } else {
            return (
              <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            );
          }
        }}
      />
    );
  };
  
  export default ProtectedRoute;