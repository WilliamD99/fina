const express = require("express");
const finnhub = require("finnhub");
require("dotenv").config();

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const profile = express.Router();

profile.get("/", (req, res) => {
  finnhubClient.companyProfile2(
    { symbol: req.headers.comp },
    (error, data, response) => {
      res.send(data);
    }
  );
});

module.exports = profile;
