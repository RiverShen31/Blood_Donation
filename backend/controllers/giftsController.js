const giftModel = require("../models/giftModel");
const mongoose = require("mongoose");
// GET GIFT DATA
const GetGiftController = async (req, res) => {
    try {
        const gift = await giftModel.find({
            
        })
    } catch (error) {
        console.log(error); 
        return res.status(500).send({
            success: false,
            message: "Error in GiftGroup Data API",
            error
        });
    }
};

module.exports = {GetGiftController};