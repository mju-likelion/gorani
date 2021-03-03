import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("app_home_opened", async ({ event, client }) => {
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        callback_id: "home_view",

        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Welcome to _Gorani's Home_* :tada:",
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();
