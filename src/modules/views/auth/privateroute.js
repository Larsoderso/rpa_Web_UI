import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

//import { authenticationService } from "@/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = false;
      //alert("Private Route");

      if (currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
