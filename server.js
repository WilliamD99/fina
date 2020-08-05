const express = require("express");
const { Server } = require("ws");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

const candle = require("./routes/candle");
const profile = require("./routes/profile");
const symbols = require("./routes/symbols");
const floors = require("./routes/floors");
const peers = require("./routes/peers");
const quote = require("./routes/quotes");
const news = require("./routes/news");
const basic = require("./routes/basicF");
const buy = require("./routes/buy");
const earning = require("./routes/earning");
const candleCurrency = require("./routes/candleCurrency");

app.use("/candle", candle);
app.use("/profile", profile);
app.use("/symbols", symbols);
app.use("/floors", floors);
app.use("/peers", peers);
app.use("/quote", quote);
app.use("/news", news);
app.use("/basic", basic);
app.use("/buy", buy);
app.use("/earn", earning);
app.use("/candleCurrency", candleCurrency);

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconected"));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
    console.log(new Date().toTimeString());
  });
}, 1000);
