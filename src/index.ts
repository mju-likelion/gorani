import { App } from "@slack/bolt";
import dotenv from "dotenv";

import addBasicEvents from "./slack/addBasicEvents";
import addBirthdayEvents from "./slack/addBirthdayEvents";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

addBasicEvents(app);
addBirthdayEvents(app);

(async () => {
  // Start your app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();
