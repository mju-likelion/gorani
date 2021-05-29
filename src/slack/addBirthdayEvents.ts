import { App } from "@slack/bolt";
import { addSeconds, subMinutes } from "date-fns";
import sqlite3 from "sqlite3";

function calcTimeForPostAt(date: string, minusMinutes?: number) {
  const [, m, d] = date.split("-");
  const newDate = `2021-${m}-${d}`;
  return Math.round(
    subMinutes(new Date(newDate), minusMinutes || 0).getTime() / 1000
  ).toString();
}

async function getBirthdays(): Promise<Birthday[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("birthday2.sqlite3");
    db.all(
      `SELECT * FROM birthday WHERE birthmonth == ${
        new Date().getMonth() + 1
      } or birthmonth == ${new Date().getMonth() + 2}`,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
    db.close();
  });
}

interface Birthday {
  id: number;
  name: string;
  birthday: string;
}

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

  app.message(
    /[Gg]orani [Bb]irthday [Aa]lert|고라니 생일 알람/,
    async ({ message, client, say }) => {
      try {
        const birthdays = await getBirthdays();
        birthdays.map(async (b) => {
          await client.chat.scheduleMessage({
            channel: message.channel,
            post_at: calcTimeForPostAt(b.birthday),
            text: `${b.name}님\n생일 키에에엑\n축하 키에에엑\n합니다 키에에엑\n:tada::tada::cake::cake::birthday::birthday:`,
          });
        });
      } catch (e) {
        await say("DB에 문제가 있습니다. 키에엑..");
        console.error(e);
      }
    }
  );

  app.message(
    /[Gg]orani [Bb]irthday [Ee]arly [Aa]lert|고라니 생일 먼저 알람/,
    async ({ message, client, say }) => {
      try {
        const birthdays = await getBirthdays();
        birthdays.map(async (b) => {
          await client.chat.scheduleMessage({
            channel: message.channel,
            post_at: calcTimeForPostAt(b.birthday, 240 + 26),
            text: `${b.name}님\n생일 키에에엑\n축하 키에에엑\n합니다 키에에엑\n:tada::tada::cake::cake::birthday::birthday:`,
          });
        });
      } catch (e) {
        await say("DB에 문제가 있습니다. 키에엑..");
        console.error(e);
      }
    }
  );
}

export default addBirthdayEvents;
