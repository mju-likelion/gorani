import { App } from "@slack/bolt";
import dotenv from "dotenv";

import addApplicantsEvent from "./slack/addApplicantsEvent";
import addBasicEvent from "./slack/addBasicEvent";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

addBasicEvent(app);
addApplicantsEvent(app);

(async () => {
  // Start your app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();
