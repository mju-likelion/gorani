import { App } from "@slack/bolt";

import { getApplicantsInfo } from "../selenium";

function addApplicantsEvent(app: App) {
  app.message("지원자 수", async ({ message, say }) => {
    console.log(message);
    let text = getApplicantsInfo().numberOfApplicantsString;
    await say(text);

    setInterval(async () => {
      const newText = getApplicantsInfo().numberOfApplicantsString;
      if (text !== newText) {
        text = newText;
        await say(newText);
      }
    }, 180000);
  });
}

export default addApplicantsEvent;
