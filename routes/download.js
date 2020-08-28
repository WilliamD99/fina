const express = require("express");

const download = express.Router();

download.get("/", (req, res) => {
  try {
    const file = `${__dirname}/../download/fina.zip`;
    res.download(file);
  } catch (err) {
    res.send(err);
  }
});

module.exports = download;
