import { App } from "@slack/bolt";

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

  app.message("knock knock", async ({ say }) => {
    await say(`_Who's there?_`);
  });

  app.message("crying", async ({ say }) => {
    await say("키야아아아악! 아아아아아악!");
  });

  app.message("울어", async ({ say }) => {
    await say("키야아아아악! 아아아아아악!");
  });
}

export default addBasicEvent;