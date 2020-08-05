const express = require("express");
const finnhub = require("finnhub");

require("dotenv").config();

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const earning = express.Router();

earning.get("/", (req, res) => {
  finnhubClient.companyEarnings(
    req.headers.comp,
    { limit: 4 },
    (error, data, response) => {
      res.send(data);
    }
  );
});

module.exports = earning;
