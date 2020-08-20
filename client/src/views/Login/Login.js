import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import { useAppContext } from "libs/contextLibs";
import { onError } from "libs/errorLibs";
import { useFormFields } from "libs/hookLibs";

import { useHistory } from "react-router-dom";

import LoaderBtn from "components/CustomButtons/LoaderButton";
import QueueAnim from "rc-queue-anim";
import "assets/jss/Login.css";

Amplify.configure(awsconfig);

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  let validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/admin/dashboard");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
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
            <LinkContainer to="/signup">
              <NavItem>Sign up</NavItem>
            </LinkContainer>

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
  );
}
