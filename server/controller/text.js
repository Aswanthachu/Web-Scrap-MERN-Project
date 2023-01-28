import puppeteer from "puppeteer";

import scrapedData from "../model/model.js";

// scraping of data from web and return

export const scrapText = async (req, res) => {
  const websiteLink = req.body.web;
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(websiteLink);

    const text = await page.evaluate(() => document.body.innerText);
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"), (e) => e.href)
    );
    const images = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"), (e) => e.src)
    );
    const videos = await page.evaluate(() =>
      Array.from(document.querySelectorAll("source"), (e) => e.src)
    );

    await browser.close();

    let newArray = [];

    if (videos.length > 0) {
      newArray = images.concat(videos);
    } else {
      newArray = images;
    }

    const textCount = text.split(" ").filter((txt) => {
      return txt != "";
    }).length;

    const storedData = await scrapedData.create({
      textCount,
      links,
      images: newArray,
      webLink:websiteLink
    });

    res.status(200).json(storedData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error." });
  }
};

// fetch previosuly scraped datas

export const getScrapDeatails = async (req, res) => {
  try {
    const datas = await scrapedData.find({});
    res.status(200).json(datas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error." });
  }
};

// Deleting of one scraped data

export const deleteScrapedData = async (req, res) => {
  console.log("hii");
  const { id } = req.params;

  try {
    await scrapedData.findByIdAndRemove({ id });
    res
      .status(200)
      .json({ message: "deletion of data is successfully completed." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error." });
  }
};

// Add to favourite

export const addToFavourite = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = await scrapedData.findByIdAndUpdate(
      id,
      { favourite: true },
      { new: true }
    );

    res.status(200).json(updatedData);
    console.log(updatedData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error." });
  }
};
