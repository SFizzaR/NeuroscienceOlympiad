const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "127.0.0.1";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/login", (req, res, next) => {
  Promise.resolve(require("./api/login")(req, res)).catch(next);
});

app.post("/api/verifyPin", (req, res, next) => {
  Promise.resolve(require("./api/verifypins")(req, res)).catch(next);
});

app.post("/api/savescore", (req, res, next) => {
  Promise.resolve(require("./api/savescore")(req, res)).catch(next);
});

app.post("/api/verifyCrossword", (req, res, next) => {
  Promise.resolve(require("./api/verifyCrossword")(req, res)).catch(next);
});

app.get("/crossword", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "crossword", "index.html"));
});

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Frontend and API running at http://${HOST}:${PORT}`);
});
