const express = require("express");
const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const candleCurrency = express.Router();

candleCurrency.get("/", (req, res) => {
  let date = new Date();
  let timeStamp = (date.getTime() / 1000).toFixed(0);
  let timeStampPast = (date.setFullYear(date.getFullYear() - 1) / 1000).toFixed(
    0
  );
  finnhubClient.forexCandles(
    `OANDA:${req.headers.from}_${req.headers.to}`,
    "D",
    timeStampPast,
    timeStamp,
    (error, data, response) => {
      let dataArr = [];
      res.send(data);
    }
  );
});

module.exports = candleCurrency;
