/*eslint-disable*/
import React, { useState } from "react";
// nodejs library to set properties for components
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";

import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "components/CustomButtons/LoaderButton";
import { useFormFields } from "libs/hookLibs";
import { onError } from "libs/errorLibs";
import { Auth } from "aws-amplify";

import image1 from "assets/img/sidebar-1.jpg";
import image2 from "assets/img/sidebar-2.jpg";
import image3 from "assets/img/sidebar-3.jpg";
import image4 from "assets/img/sidebar-4.jpg";

import "assets/jss/Login.css";

export default function Profile(props) {
  const { user, handleColorClick, handleImageClick, handleSettings } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState(user["custom:color"]);
  const [bgImage, setBgImage] = useState(props.bgImage);

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  // Use this to validate the form to enable the Save button
  function validateConfirmationForm() {
    return fields.username.length > 0 && fields.email.length > 0;
  }
  // This function is used to set the color in the user's attributes
  const handleColorUser = (e) => {
    setColor(e);
    const id = document.getElementById(e);
    const allColor = document.querySelectorAll(".badge");
    for (const i of allColor) {
      i.classList.remove("active");
    }
    id.classList.add("active");
  };
  const handleImageUser = (e) => {
    setBgImage(e);
  };

  async function handleClickSubmit(event) {
    event.preventDefault();

    // setIsSendingCode(true);
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        "custom:preferUsername": fields.username,
        "custom:color": color,
        "custom:image": bgImage,
      });
      setIsLoading(false);
      // setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
      // setIsSendingCode(false);
    }
  }

  return (
    <div className="d-flex profile">
      <Card>
        <CardBody>
          <h3 className="text-center">Setting</h3>
          <div className="authenticate-page" id="setting">
            <form onSubmit={handleClickSubmit}>
              <FormGroup controlId="username" bsSize="large">
                <FormLabel>Username</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  onChange={handleFieldChange}
                  defaultValue={user["custom:preferUsername"]}
                />
              </FormGroup>
              <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  onChange={handleFieldChange}
                  defaultValue={user["email"]}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Theme color</FormLabel>
                <a className="switch-trigger">
                  <div>
                    <span
                      className={
                        props.bgColor === "purple"
                          ? "badge filter badge-purple active"
                          : "badge filter badge-purple"
                      }
                      data-color="purple"
                      id="purple"
                      onClick={() => {
                        handleColorClick("purple");
                        handleColorUser("purple");
                      }}
                    />
                    <span
                      className={
                        props.bgColor === "blue"
                          ? "badge filter badge-blue active"
                          : "badge filter badge-blue"
                      }
                      id="blue"
                      data-color="blue"
                      onClick={() => {
                        handleColorClick("blue");
                        handleColorUser("blue");
                      }}
                    />
                    <span
                      className={
                        props.bgColor === "green"
                          ? "badge filter badge-green active"
                          : "badge filter badge-green"
                      }
                      id="green"
                      data-color="green"
                      onClick={() => {
                        handleColorClick("green");
                        handleColorUser("green");
                      }}
                    />
                    <span
                      className={
                        props.bgColor === "red"
                          ? "badge filter badge-red active"
                          : "badge filter badge-red"
                      }
                      id="red"
                      data-color="red"
                      onClick={() => {
                        handleColorClick("red");
                        handleColorUser("red");
                      }}
                    />
                    <span
                      className={
                        props.bgColor === "orange"
                          ? "badge filter badge-orange active"
                          : "badge filter badge-orange"
                      }
                      id="orange"
                      data-color="orange"
                      value="orange"
                      onClick={(e) => {
                        handleColorClick("orange");
                        handleColorUser("orange");
                      }}
                    />
                  </div>
                </a>
              </FormGroup>
              <FormGroup>
                <FormLabel>Background Image</FormLabel>
                <ul className="img-container">
                  <li className={bgImage === image1 ? "active" : ""}>
                    <a
                      className="img-holder switch-trigger"
                      onClick={() => {
                        handleImageUser(image1);
                        handleImageClick(image1);
                      }}
                    >
                      <img src={image1} alt="..." />
                    </a>
                  </li>
                  <li className={bgImage === image2 ? "active" : ""}>
                    <a
                      className="img-holder switch-trigger"
                      onClick={() => {
                        handleImageUser(image2);
                        handleImageClick(image2);
                      }}
                    >
                      <img src={image2} alt="..." />
                    </a>
                  </li>
                  <li className={bgImage === image3 ? "active" : ""}>
                    <a
                      className="img-holder switch-trigger"
                      onClick={() => {
                        handleImageUser(image3);
                        handleImageClick(image3);
                      }}
                    >
                      <img src={image3} alt="..." />
                    </a>
                  </li>
                  <li className={bgImage === image4 ? "active" : ""}>
                    <a
                      className="img-holder switch-trigger"
                      onClick={() => {
                        handleImageUser(image4);
                        handleImageClick(image4);
                      }}
                    >
                      <img src={image4} alt="..." />
                    </a>
                  </li>
                </ul>
              </FormGroup>
              <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                // disabled={!validateConfirmationForm()}
              >
                Save
              </LoaderButton>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
