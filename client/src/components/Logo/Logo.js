import React, { Component } from "react";
import Vivus from "vivus";
import svg from "assets/logo.svg";

export default class Logo extends Component {
  componentDidMount() {
    new Vivus("svg_logo", { duration: 200, file: svg }, () => {
      let path = document.getElementsByClassName("path");
      for (const tag of path) {
        tag.setAttribute("fill", "#603913");
      }
    });
  }

  render() {
    return <div id="svg_logo" className="banner-img img-fluid will-logo"></div>;
  }
}
