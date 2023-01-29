import puppeteer from "puppeteer";

import scrapedData from "../model/model.js";

// scraping of data from web and return

export const scrapText = async (req, res) => {
  const websiteLink = req.body.web;

  try {
    const existing = await scrapedData.findOne({ webLink: websiteLink });
    if (existing) {
      const existingScrap = await scrapedData.findOneAndUpdate(
        { webLink: websiteLink },
        { createdAt: new Date() }
      );
      res.status(200).json(existingScrap);
    } else {
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

      // function for remove duplicate elements

      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }

      // processing of links remove duplication and empty strings

      var noEmptyLinks = links.filter(
        (li) => li !== "javascript:void(0);" && li !== "javascript:void(0)"
      );

      let noDuplicateLinks = removeDuplicates(noEmptyLinks);

      // processing of duplication of links from media strings

      let newArray = [];

      if (videos.length > 0) {
        newArray = images.concat(videos);
      } else {
        newArray = images;
      }

      const noEmptyMediaLinks = newArray.filter((li) => li !== "");

      const noDuplicateMediaLinks=removeDuplicates(noEmptyMediaLinks);

      // counting the words from word list

      const textCount = text.split(" ").filter((txt) => {
        return txt != "";
      }).length;

      const storedData = await scrapedData.create({
        textCount,
        links: noDuplicateLinks,
        images: noDuplicateMediaLinks,
        webLink: websiteLink,
      });

      res.status(200).json(storedData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error." });
  }
};

// fetch previosuly scraped datas

export const getScrapDeatails = async (req, res) => {
  try {
    const datas = await scrapedData.find({}).sort({ createdAt: -1 });
    console.log(datas[0].images);
    res.status(200).json(datas);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error." });
  }
};

// Deleting of one scraped data

export const deleteScrapedData = async (req, res) => {
  const { id } = req.params;

  try {
    await scrapedData.findByIdAndRemove(id);
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server Error." });
  }
};
