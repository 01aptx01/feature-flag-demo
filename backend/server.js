const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./featureFlags.json";

function readFlags() {
  return JSON.parse(fs.readFileSync(FILE));
}

function writeFlags(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/flags", (req, res) => {
  res.json(readFlags());
});

app.post("/flags", (req, res) => {
  const flags = readFlags();
  const updated = { ...flags, ...req.body };
  writeFlags(updated);
  res.json(updated);
});

app.listen(4000, () => {
  console.log("Backend running on 4000");
});
