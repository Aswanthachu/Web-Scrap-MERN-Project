import express from "express";

import { scrapText} from "../controller/text.js";

const router=express.Router();

router.get("/text-scrap",scrapText);

export default router;