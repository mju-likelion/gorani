import { Builder, By, Key } from "selenium-webdriver";
import dotenv from "dotenv";

dotenv.config();

export async function getApplicantsInfo() {
  let numberOfApplicantsString = "";

  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://apply.likelion.org/accounts/login/?next=/apply/");
    await driver
      .findElement(By.id("id_username"))
      .sendKeys(process.env.APPLY_ID!);
    await driver
      .findElement(By.id("id_password"))
      .sendKeys(process.env.APPLY_PW!);
    await driver
      .findElement(
        By.xpath("/html/body/main/div[2]/div/div/div/form/div[3]/button")
      )
      .click();
    await driver
      .findElement(By.xpath('//*[@id="likelion_num"]/div[2]/a/button'))
      .sendKeys(Key.ENTER);
    const strings = await driver.findElements(
      By.xpath('//*[@id="likelion_num"]/div[2]/p')
    );
    numberOfApplicantsString = `
      ${await strings[0].getText()}\n${await strings[1].getText()}
    `;
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }

  return {
    numberOfApplicantsString,
  };
}
