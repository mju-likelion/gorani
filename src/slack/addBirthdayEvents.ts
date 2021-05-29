import { App } from "@slack/bolt";
import { addSeconds } from "date-fns";

function addBirthdayEvents(app: App) {
  app.message("고라니 15초 알람", async ({ message, client }) => {
    try {
      const fifteenEpoch = Math.round(
        addSeconds(Date.now(), 15).getTime() / 1000
      );
      await client.chat.scheduleMessage({
        channel: message.channel,
        post_at: fifteenEpoch.toString(),
        text: "15초 지났당",
      });
    } catch (e) {
      console.error(e);
    }
  });
}

export default addBirthdayEvents;
