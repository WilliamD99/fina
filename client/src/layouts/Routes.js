import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DC from "layouts/DC";
import Login from "views/Login/Login";
import Signup from "views/Signup/Signup";
import Reset from "views/ForgetPW/ResetPW";
import { useHistory } from "react-router-dom";
import NotFound from "views/NotFound/NotFound";
import { useAppContext } from "libs/contextLibs";
import Verification from "views/Verification/Verification";
import { Auth } from "aws-amplify";

export default function Routes(props) {
  const { handleLogout } = props;

  const history = useHistory();
  const { isAuthenticated } = useAppContext();

  return (
    <Switch>
      <Route
        path="/login"
        render={() =>
          isAuthenticated ? history.push("/admin/dashboard") : <Login />
        }
        exact
      />
      <Route
        path="/signup"
        render={() =>
          isAuthenticated ? history.push("/admin/dashboard") : <Signup />
        }
        exact
      />
      <Route
        path="/reset"
        render={() =>
          isAuthenticated ? history.push("/admin/dashboard") : <Reset />
        }
      />
      <Route path="/verify" component={Verification} />
      <Route
        path="/admin/dashboard"
        render={() =>
          isAuthenticated ? (
            <DC handleLogout={handleLogout} />
          ) : (
            history.push("/login")
          )
        }
        exact
      />
      <Route
        path="/admin/about"
        render={() =>
          isAuthenticated ? (
            <DC handleLogout={handleLogout} />
          ) : (
            history.push("/login")
          )
        }
        exact
      />
      <Route
        path="/admin/finance"
        render={() =>
          isAuthenticated ? (
            <DC handleLogout={handleLogout} />
          ) : (
            history.push("/login")
          )
        }
        exact
      />

      <Redirect from="/" to="/login" exact />
      <Redirect from="/admin" to="/admin/dashboard" exact />
      <Route component={NotFound} />
    </Switch>
  );
}
