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

  app.message("고라니 배틀", async ({client, message, say}) => {
    // @ts-expect-error
    const opponent = message.text.split('고라니 배틀 ')[1];

    const {
      // @ts-expect-error
      user: {real_name},
      // @ts-expect-error
    } = await client.users.info({user: message.user})

    const winner = Math.floor(Math.random() * 2);

    if (winner) {
      // if winner equals 1
      await say(`${opponent} 물에 빠져 우적댑니다! 승자는 ${real_name}!`)
    } else {
      await say(`${opponent} 독가스가 살포되었지만 방독면이 있었습니다! ${real_name} 패배!`)
    }
  })
}

export default addBasicEvent;
