const express = require("express");
const authMiddleware = require("../middlewares/authMiddelware");
const {GetGiftController} = require("../controllers/giftsController");

const router = express.Router();

//routes

// GET GIFT DATA
router.get("/get-gift", authMiddleware, GetGiftController);
module.exports = router;