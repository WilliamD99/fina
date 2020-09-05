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
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Snackbar from "components/Snackbar/Snackbar";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
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
        attributes: {
          "custom:preferUsername": fields.username,
          "custom:color": "blue",
          "custom:image": "/static/media/sidebar-3.25031690.jpg",
        },
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      let err = onError(e);
      err === "An account with the given email already exists."
        ? showNotification("bc", err)
        : console.log(err);
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
      let err = onError(e);
      alert(err);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <QueueAnim
        delay={200}
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

  // Get screen's width for tooltips
  let width = window.screen.width,
    direction = width < 768 ? "" : "right";

  function renderForm() {
    return (
      <>
        <QueueAnim
          delay={200}
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
              <FormGroup controlId="username" bsSize="large">
                <FormLabel>User name</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={fields.username}
                  onChange={handleFieldChange}
                />
              </FormGroup>
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
                        <li>
                          <CheckIcon className="pw-validate" />
                          Password must have at least 8 characters
                        </li>
                        <li>
                          {" "}
                          <CheckIcon className="pw-validate" />
                          Password must have at least one uppercase
                        </li>
                        <li>
                          {" "}
                          <CheckIcon className="pw-validate" />
                          Password must have at least one number
                        </li>
                        <li>
                          {" "}
                          <CheckIcon className="pw-validate" />
                          Password must have at least one special character
                        </li>
                      </ul>
                    </>
                  }
                  arrow
                  placement={direction}
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
        </QueueAnim>{" "}
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

  return <>{newUser === null ? renderForm() : renderConfirmationForm()}</>;
}
