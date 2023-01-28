import puppeteer from "puppeteer";

export const scrapText = async (req, res) => {
  const websiteLink = req.body.web;
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(websiteLink);

    var text = await page.evaluate(() => document.body.innerText);
    var links= await page.evaluate(()=>Array.from(document.querySelectorAll('a'),(e)=>e.href));
    var images= await page.evaluate(()=>Array.from(document.querySelectorAll('img'),(e)=>e.src));
    var videos= await page.evaluate(()=>Array.from(document.querySelectorAll('source'),(e)=>e.src));

    await browser.close();

    const textCount = text.split(" ").filter((txt) => {
      return txt != "";
    }).length;

    res.status(200).json({ textCount,links,images,videos});

  } catch (error) {
    console.log(error);
  }
};
