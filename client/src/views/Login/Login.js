import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";

import Amplify, { Auth } from "aws-amplify";

import { useAppContext } from "libs/contextLibs";
import { onError } from "libs/errorLibs";
import { useFormFields } from "libs/hookLibs";

import { useHistory } from "react-router-dom";

import LoaderBtn from "components/CustomButtons/LoaderButton";
import QueueAnim from "rc-queue-anim";
import "assets/jss/Login.css";
import Snackbar from "components/Snackbar/Snackbar";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

require("dotenv").config();

let config = {
  aws_project_region: process.env.REACT_APP_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
};

Amplify.configure(config);

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  // Snackbar
  const [bc, setBC] = useState(false);
  const [contents, setContents] = useState();
  const showNotification = (place, content) => {
    switch (place) {
      case "bc":
        if (!bc) {
          setBC(true);
          setContents(content);
          setTimeout(function () {
            setBC(false);
          }, 6000);
        }
        break;
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  let validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  async function handleLogin(e) {
    e.preventDefault();
    await Auth.signIn(fields.email, fields.password);

    history.push("/verify");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
    } catch (e) {
      let err = onError(e);
      err === "User is not confirmed."
        ? history.push("/verify")
        : showNotification("bc", err);
      setIsLoading(false);
    }
  }

  return (
    <>
      <QueueAnim
        delay={300}
        type={["right", "left"]}
        ease={["easeOutQuart", "easeInOutQuart"]}
      >
        <div key="login" className="authenticate-page" id="login">
          <div className="left"></div>
          <form onSubmit={handleSubmit}>
            <h4>
              Welcome back to <span>Fina</span>
            </h4>
            <p className="title">
              Log in to your account to view today's stock market:
            </p>
            <FormGroup controlId="email" size="large">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
              />
            </FormGroup>
            <FormGroup controlId="password" size="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={fields.password}
                onChange={handleFieldChange}
                type="password"
              />
            </FormGroup>
            <div className="d-flex action-container">
              <div className="d-flex btn-container">
                <LinkContainer to="/signup">
                  <NavItem>Sign up</NavItem>
                </LinkContainer>
                <LinkContainer to="/reset">
                  <NavItem>Forgot password?</NavItem>
                </LinkContainer>
              </div>

              <LoaderBtn
                block
                type="submit"
                size="small"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Login
              </LoaderBtn>
            </div>
          </form>
        </div>
      </QueueAnim>
      <Snackbar
        place="bc"
        color="danger"
        icon={ErrorOutlineIcon}
        message={contents}
        open={bc}
        closeNotification={() => setBC(false)}
        close
        className="login-warning"
      />
    </>
  );
}
