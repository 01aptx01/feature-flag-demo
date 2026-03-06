const express = require("express");
const cors = require("cors");
const LD = require("launchdarkly-node-server-sdk");

const app = express();
app.use(cors());

const sdkKey = process.env.LD_SDK_KEY;

const client = LD.init(sdkKey);

client.waitForInitialization().then(() => {
  console.log("LaunchDarkly ready");
});

app.get("/flags", async (req, res) => {
  const user = {
    key: "demo-user",
  };

  const flag = await client.variation("enable_new_ui", user, false);

  res.json({
    enable_new_ui: flag,
  });
});

app.listen(4000, () => {
  console.log("Backend running");
});
