import { App } from "@slack/bolt";
import dotenv from "dotenv";
import { getApplicantsInfo } from "./selenium";

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

app.message("knock knock", async ({ say }) => {
  await say(`_Who's there?_`);
});

let lastSendMessage = "";
let lastSendTime = 0;

app.message("지원자 수", async ({ say }) => {
  if (lastSendMessage === "" || Date.now() - lastSendTime > 60000) {
    const text = (await getApplicantsInfo()).numberOfApplicantsString;
    lastSendMessage = text;
    lastSendTime = Date.now();
    await say(text);
  } else {
    await say(lastSendMessage);
  }
});

(async () => {
  // Start your app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();
