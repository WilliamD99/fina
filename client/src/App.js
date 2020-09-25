import React, { useState, useEffect } from "react";
import { AppContext } from "libs/contextLibs";
import { onError } from "libs/errorLibs";

import { useHistory } from "react-router-dom";

import Routes from "layouts/Routes";

import { Auth } from "aws-amplify";

export default function App() {
  const history = useHistory();
  // Check if user is log in or not
  const [isAuthenticated, userHasAuthenticated] = useState(false); // This will be used in context (globally access through context)
  // Keep the log in session
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // The useEffect hook takes a function and an array of variables. The function will be called every time the component is rendered. And the array of variables tell React to only re-run our function if the passed in array of variables have changed. This allows us to control when our function gets run
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }
  return (
    !isAuthenticating && (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes handleLogout={handleLogout} />
      </AppContext.Provider>
    )
  );
}
