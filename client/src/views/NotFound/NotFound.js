import React from "react";
import "assets/jss/Login.css";
import { Link } from "react-router-dom";

export default function NotFound(props) {
  return (
    <div className="wrapper">
      <h1>404</h1>
      <p>
        Hmm, seems that you're lost in NoWhere Land. Let me help you get back
        home safety.
      </p>
      <div className="button ">
        <Link onClick={() => props.history.goBack()}>Back</Link>
        <Link to="/admin">Home</Link>
      </div>
    </div>
  );
}
