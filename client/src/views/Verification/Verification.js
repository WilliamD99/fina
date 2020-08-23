import React, { useState } from "react";
import QueueAnim from "rc-queue-anim";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppContext } from "libs/contextLibs";
import { onError } from "libs/errorLibs";
import { Auth } from "aws-amplify";
import { useFormFields } from "libs/hookLibs";
import LoaderButton from "components/CustomButtons/LoaderButton";

export default function Verification(props) {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  // const email = user.attributes.email;
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmationCode: "",
  });
  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
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
          <FormGroup controlId="confirmationCode" bsSize="large">
            <FormLabel>Confirmation Code</FormLabel>
            <FormControl
              autoFocus
              type="tel"
              onChange={handleFieldChange}
              value={fields.confirmationCode}
            />
          </FormGroup>
          <div className="d-flex btn-container">
            <LoaderButton onClick={() => props.history.goBack()}>
              Back
            </LoaderButton>
            <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
            >
              Verify
            </LoaderButton>
          </div>
        </form>
      </div>
    </QueueAnim>
  );
}
