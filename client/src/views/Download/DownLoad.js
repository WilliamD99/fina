import React from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import download from "downloadjs";

export default function DownLoad() {
  const history = useHistory();

  const downloadFile = async () => {
    const res = await fetch("/download");
    const blob = await res.blob();
    download(blob, "fina.zip");
  };

  const redirect = () => {
    history.push("/not-found");
  };

  const enableDownload = async () => {
    let user = await Auth.currentUserInfo();
    let email = user["attributes"]["email"];

    email === "fina.dev@protonmail.com" ? downloadFile() : redirect();
    console.log(email);
  };
  enableDownload();

  return <div></div>;
}
