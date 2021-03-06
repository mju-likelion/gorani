import { App } from "@slack/bolt";

import { getApplicantsInfo } from "../selenium";

function addApplicantsEvent(app: App) {
  let lastSendMessage = "";
  let lastSendTime = 0;

  app.message("지원자 수", async ({ message, say }) => {
    console.log(message);
    if (lastSendMessage === "" || Date.now() - lastSendTime > 60000) {
      const text = (await getApplicantsInfo()).numberOfApplicantsString;
      lastSendMessage = text;
      lastSendTime = Date.now();
      await say(text);
    } else {
      await say(lastSendMessage);
    }
  });
}

export default addApplicantsEvent;
