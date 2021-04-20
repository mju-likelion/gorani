import {App} from "@slack/bolt";

import randomMessage from "../lib/randomMessage";

function addBasicEvent(app: App) {
  app.event("app_home_opened", async ({event, client}) => {
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

  app.message(/[Gg]orani [Cc]ry|고라니 울어/, async ({say}) => {
    await say("키야아아아악! 아아아아아악!");
  });

  app.message(/[Gg]orani [Tt]hrow|고라니 던져/, async ({client, message, say}) => {
    const {
      // @ts-expect-error
      user: {real_name},
      // @ts-expect-error
    } = await client.users.info({user: message.user});
    await say(`${real_name}: ${Math.ceil(Math.random() * 100)} 나왔습니다.`);
  });

  app.message(/[Gg]orani [Bb]attle|고라니 배틀/, async ({client, message, say}) => {
    // @ts-expect-error
    const opponent = message.text.split(/[Gg]orani [Bb]attle |고라니 배틀 /)[1];

    const {
      // @ts-expect-error
      user: {real_name},
      // @ts-expect-error
    } = await client.users.info({user: message.user});

    const winner = Math.floor(Math.random() * 2);
    const winMessage = randomMessage(winner, real_name, opponent);

    await say(winMessage);
  });

  app.message(/[Gg]orani [Bb]irthday|고라니 생일/, async ({say}) => {
    // @ts-expect-error
    await say({
      blocks: [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '```' +
            '김소현: 3월 2일\n' +
            '홍승현: 3월 16일\n' +
            '김한솔: 4월 21일\n' +
            '이주호: 10월 31일\n' +
            '유예빈: 11월 2일\n' +
            '고승화: 11월 3일\n' +
            '김진수: 11월 21일\n' +
            '```'
        }
      }]
    })
  })

  app.message(/고라니 .*족보.*/, async ({say}) => {
    const t = Math.floor(Math.random() * 4)

    switch (t) {
      case 3:
        await say("니가 공부를 열심히 하셔야죠")
        break;
      case 2:
        await say("undefined")
        break;
      case 1:
        await say("null")
        break;
      case 0:
      default:
        await say("퉤")
    }
  })
}

export default addBasicEvent;
