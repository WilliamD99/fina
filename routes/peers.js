const express = require("express");
const finnhub = require("finnhub");
require("dotenv").config();

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const peers = express.Router();

peers.get("/", (req, res) => {
  finnhubClient.companyPeers(req.headers.comp, (error, data, response) => {
    res.send(data.filter((comp) => comp !== req.headers.comp).slice(0, 4));
  });
});

module.exports = peers;
