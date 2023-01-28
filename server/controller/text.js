import puppeteer from "puppeteer";

export const scrapText = async (req, res) => {
  console.log(req.body);
  const websiteLink = req.body.web;
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(websiteLink);

    var text = await page.evaluate(() => document.body.innerText);

    await browser.close();

    const count = text.split(" ").filter((txt) => {
      return txt != "";
    }).length;

    res.status(200).json({ count: count });
  } catch (error) {
    console.log(error);
  }
};
