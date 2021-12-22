const magicconch = require("./magicconch.js");
const express = require("express");
const PORT = process.env.PORT || 5000;

// Server
express()
  // Middleware
  .use(express.json())
  .use(express.urlencoded())
  // Routes
  .get("/", (req, res) => res.send("All hail the Magic Conch!"))
  .post("/", (req, res) => magicconch.processMessage(req, res))
  // Start
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
