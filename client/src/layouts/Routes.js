import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DC from "layouts/DC";
import Login from "views/Login/Login";
import Signup from "views/Signup/Signup";
import { useHistory } from "react-router-dom";
import NotFound from "views/NotFound/NotFound";
import { useAppContext } from "libs/contextLibs";

export default function Routes(props) {
  const { handleLogout, authenticated } = props;
  const history = useHistory();
  const { isAuthenticated } = useAppContext();

  console.log(isAuthenticated);
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
