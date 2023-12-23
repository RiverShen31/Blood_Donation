const express = require("express");
const authMiddleware = require("../middlewares/authMiddelware");
const {GetGiftListController, createGiftController, deleteGiftController, updateGiftController} = require("../controllers/giftsController");

const router = express.Router();

//routes

// GET GIFT DATA
router.get("/gift-list", authMiddleware, GetGiftListController);
// router.get("/gift-list", GetGiftListController);
router.post("/create-gift", authMiddleware, createGiftController);

// DElete
router.delete("/delete-gift/:id", authMiddleware, deleteGiftController);
// Update
router.put("/update-gift/:id", authMiddleware, updateGiftController);

module.exports = router;