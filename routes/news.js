const express = require("express");
const finnhub = require("finnhub");

require("dotenv").config();

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const news = express.Router();

news.get("/", (req, res) => {
  let date = new Date();
  let upperYear = date.getFullYear(),
    upperMonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
    upperDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    upper = `${upperYear}-${upperMonth}-${upperDay}`;
  date.setDate(date.getDate() - 7);
  let lowerYear = date.getFullYear(),
    lowerMonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
    lowerDay = date.getDate(),
    lower = `${lowerYear}-${lowerMonth}-${lowerDay}`;

  finnhubClient.companyNews(
    req.headers.comp,
    lower,
    upper,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        res.send(data.slice(0, 14));
      }
    }
  );
});

module.exports = news;
