const express = require("express");
const finnhub = require("finnhub");

const floorFile = __dirname + "/../models/floor.json";

const floors = require(floorFile);

const floorsRoute = express.Router();

floorsRoute.get("/", (req, res) => {
  res.send(floors);
});

module.exports = floorsRoute;
