import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DC from "layouts/DC";
import Login from "views/Login/Login";
import Signup from "views/Signup/Signup";
import { useHistory } from "react-router-dom";
import NotFound from "views/NotFound/NotFound";

export default function Routes(props) {
  const { handleLogout, authenticated } = props;
  const history = useHistory();

  return (
    <Switch>
      <Route
        path="/login"
        render={() =>
          authenticated ? history.push("/admin/dashboard") : <Login />
        }
        exact
      />
      <Route
        path="/signup"
        render={() =>
          authenticated ? history.push("/admin/dashboard") : <Signup />
        }
        exact
      />
      <Route
        path="/admin/dashboard"
        render={() => <DC handleLogout={handleLogout} />}
        exact
      />
      <Route
        path="/admin/about"
        render={() => <DC handleLogout={handleLogout} />}
        exact
      />
      <Route
        path="/admin/finance"
        render={() => <DC handleLogout={handleLogout} />}
        exact
      />
      <Redirect from="/" to="/login" exact />
      <Redirect from="/admin" to="/admin/dashboard" exact />
      <Route component={NotFound} />
    </Switch>
  );
}
