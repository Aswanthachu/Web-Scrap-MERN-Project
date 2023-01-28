import express from "express";

import { scrapText,getScrapDeatails,deleteScrapedData,addToFavourite} from "../controller/text.js";

const router=express.Router();

router.post("/text-scrap",scrapText);
router.get("/get-all-scraped-details",getScrapDeatails);
router.delete("/remove-one-scraped-data:id",deleteScrapedData);
router.patch("/add-to-favourite:id",addToFavourite);

export default router;