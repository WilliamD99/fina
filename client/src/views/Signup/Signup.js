import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "components/CustomButtons/LoaderButton";
import { useAppContext } from "libs/contextLibs";
import { useFormFields } from "libs/hookLibs";
import { onError } from "libs/errorLibs";
import { Auth } from "aws-amplify";
import "assets/jss/Login.css";
import { NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";
import QueueAnim from "rc-queue-anim";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword &&
      fields.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/
      )
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/admin/dashboard");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <QueueAnim
        delay={300}
        type={["right", "left"]}
        ease={["easeOutQuart", "easeInOutQuart"]}
      >
        <div key="verify" className="authenticate-page" id="verification">
          <div className="left"></div>
          <form onSubmit={handleConfirmationSubmit}>
            <h4>Verify your account</h4>
            <p className="title">
              A verificationn code has been sent to your email
            </p>
            <FormGroup controlId="confirmationCode" bsSize="large">
              <FormLabel>Confirmation Code</FormLabel>
              <FormControl
                autoFocus
                type="tel"
                onChange={handleFieldChange}
                value={fields.confirmationCode}
              />
            </FormGroup>
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
            >
              Verify
            </LoaderButton>
          </form>
        </div>
      </QueueAnim>
    );
  }

  function renderForm() {
    return (
      <QueueAnim
        delay={300}
        type={["right", "left"]}
        ease={["easeOutQuart", "easeInOutQuart"]}
      >
        <div key="signup" className="authenticate-page" id="signup">
          <div className="left"></div>
          <form onSubmit={handleSubmit}>
            <h4>
              Welcome to <span>Fina</span>
            </h4>
            <p className="title">Sign up to view today's stock market:</p>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <Tooltip
                title={
                  <>
                    <ul className="tooltip-pw">
                      <li>Password must have at least 8 characters</li>
                      <li>Password must have at least one uppercase</li>
                      <li>Password must have at least one number</li>
                      <li>Password must have at least one special character</li>
                    </ul>
                  </>
                }
                arrow
                placement="right"
              >
                <FormControl
                  type="password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
              </Tooltip>
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
              />
            </FormGroup>
            <div className="d-flex action-container">
              <LinkContainer to="/login">
                <NavItem>Have an account?</NavItem>
              </LinkContainer>

              <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Sign up
              </LoaderButton>
            </div>
          </form>
        </div>
      </QueueAnim>
    );
  }

  return <>{newUser === null ? renderForm() : renderConfirmationForm()}</>;
}