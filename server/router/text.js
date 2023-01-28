import express from "express";

import { scrapText} from "../controller/text.js";

const router=express.Router();

router.post("/text-scrap",scrapText);

export default router;