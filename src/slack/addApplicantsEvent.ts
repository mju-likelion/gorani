import { App } from "@slack/bolt";

import { getApplicantsInfo } from "../selenium";

function addApplicantsEvent(app: App) {
  app.message("지원자 수", async ({ message, say }) => {
    console.log(message);
    await say(getApplicantsInfo().numberOfApplicantsString);
  });
}

export default addApplicantsEvent;
