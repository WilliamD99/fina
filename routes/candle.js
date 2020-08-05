const express = require("express");
const finnhub = require("finnhub");
const d3 = require("d3-time-format");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const candle = express.Router();

candle.get("/", (req, res) => {
  let date = new Date();
  let timeStamp = (date.getTime() / 1000).toFixed(0);
  let timeStampPast = (date.setFullYear(date.getFullYear() - 1) / 1000).toFixed(
    0
  );

  finnhubClient.stockCandles(
    req.headers.comp,
    "D",
    timeStampPast,
    timeStamp,
    {},
    (error, data, response) => {
      let dataArr = [];
      if (data !== null) {
        for (let i = 0; i < data.o.length; i++) {
          let open = data.o[i],
            close = data.c[i],
            high = data.h[i],
            low = data.l[i],
            volume = data.v[i];

          dataArr.push([data.t[i] * 1000, open, high, low, close, volume]);
        }
        res.send(dataArr);
      } else {
        res.send({ error: "No data" });
      }
    }
  );
});

module.exports = candle;
