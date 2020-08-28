import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DC from "layouts/DC";
import Login from "views/Login/Login";
import Signup from "views/Signup/Signup";
import Reset from "views/ForgetPW/ResetPW";
import { useHistory } from "react-router-dom";
import NotFound from "views/NotFound/NotFound";
import { useAppContext } from "libs/contextLibs";
import Verification from "views/Verification/Verification";

export default function Routes(props) {
  const { handleLogout } = props;

  const history = useHistory();
  const { isAuthenticated } = useAppContext();

  const appRoutes = ["dashboard", "about", "finance", "profile"];
  const authRoutes = [
    {
      path: "login",
      component: <Login />,
    },
    {
      path: "signup",
      component: <Signup />,
    },
    {
      path: "reset",
      component: <Reset />,
    },
    {
      path: "verify",
      component: <Verification />,
    },
  ];

  const appRouteConstructor = appRoutes.map((route, i) => {
    return (
      <Route
        key={i}
        path={`/admin/${route}`}
        render={() =>
          isAuthenticated ? (
            <DC handleLogout={handleLogout} />
          ) : (
            history.push("/login")
          )
        }
        exact
      />
    );
  });

  const authRouteConstructor = authRoutes.map((route, i) => {
    return (
      <Route
        key={i}
        path={`/${route.path}`}
        render={() =>
          isAuthenticated ? history.push("/admin/dashboard") : route.component
        }
      />
    );
  });

  return (
    <Switch>
      {authRouteConstructor}
      {appRouteConstructor}

      <Redirect from="/" to="/login" exact />
      <Redirect from="/admin" to="/admin/dashboard" exact />
      <Route component={NotFound} />
    </Switch>
  );
}
