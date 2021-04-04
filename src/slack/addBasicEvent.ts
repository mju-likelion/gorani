import { App } from "@slack/bolt";

import randomMessage from "../lib/randomMessage";

function addBasicEvent(app: App) {
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

  app.message(/gorani cry|고라니 울어/, async ({ say }) => {
    await say("키야아아아악! 아아아아아악!");
  });

  app.message("고라니 던져", async ({ client, message, say }) => {
    const {
      // @ts-expect-error
      user: { real_name },
      // @ts-expect-error
    } = await client.users.info({ user: message.user });
    await say(`${real_name}: ${Math.ceil(Math.random() * 100)} 나왔습니다.`);
  });

  app.message("고라니 배틀", async ({ client, message, say }) => {
    // @ts-expect-error
    const opponent = message.text.split("고라니 배틀 ")[1];

    const {
      // @ts-expect-error
      user: { real_name },
      // @ts-expect-error
    } = await client.users.info({ user: message.user });

    const winner = Math.floor(Math.random() * 2);
    const winMessage = randomMessage(winner, real_name, opponent);

    await say(winMessage);
  });
}

export default addBasicEvent;
