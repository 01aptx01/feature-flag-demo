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
  const user = { key: "demo-user" };

  const showNewUI = await client.variation("enable_new_ui", user, false);
  const showBanner = await client.variation("show_promo_banner", user, false);
  const enableDark = await client.variation("enable_dark_mode", user, false);

  res.json({
    enable_new_ui: showNewUI,
    show_promo_banner: showBanner,
    enable_dark_mode: enableDark,
  });
});

app.listen(4000, () => {
  console.log("Backend running");
});
