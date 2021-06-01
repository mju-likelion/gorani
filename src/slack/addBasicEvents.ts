import { App } from "@slack/bolt";

import randomMessage from "../lib/randomMessage";

function addBasicEvents(app: App) {
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

  app.message(/[Gg]orani [Cc]ry|고라니 울어/, async ({ say }) => {
    await say("키야아아아악! 아아아아아악!");
  });

  app.message(
    /[Gg]orani [Tt]hrow|고라니 던져/,
    async ({ client, message, say }) => {
      const {
        // @ts-expect-error
        user: { real_name },
        // @ts-expect-error
      } = await client.users.info({ user: message.user });
      await say(`${real_name}: ${Math.ceil(Math.random() * 100)} 나왔습니다.`);
    }
  );

  app.message(
    /[Gg]orani [Bb]attle|고라니 배틀/,
    async ({ client, message, say }) => {
      // @ts-expect-error
      const opponent = message.text.split(
        /[Gg]orani [Bb]attle |고라니 배틀 /
      )[1];

      const {
        // @ts-expect-error
        user: { real_name },
        // @ts-expect-error
      } = await client.users.info({ user: message.user });

      const winner = Math.floor(Math.random() * 2);
      const winMessage = randomMessage(winner, real_name, opponent);

      await say(winMessage);
    }
  );

  app.message(/고라니 .*족보.*/, async ({ say }) => {
    const t = Math.floor(Math.random() * 4);

    switch (t) {
      case 3:
        await say("니가 공부를 열심히 하셔야죠");
        break;
      case 2:
        await say("undefined");
        break;
      case 1:
        await say("null");
        break;
      case 0:
      default:
        await say("퉤");
    }
  });

  app.message(/고라니 공부.*/, async ({ say }) => {
    await say(
      `고라니는 맹수에게 쫓길 때\n뇌가 120% 활성화 되는 집중력을 보이는 법이지`
    );
  });
}

export default addBasicEvents;
