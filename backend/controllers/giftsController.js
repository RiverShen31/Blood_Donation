const giftModel = require("../models/giftModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
// GET GIFT DATA
const GetGiftListController = async (req, res) => {
  try {
    const giftData = await giftModel.find().sort({ createAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: giftData.length,
      message: "Gift List Fetched Successfully",
      giftData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GiftGroup Data API",
      error,
    });
  }
};
const createGiftController = async (req, res) => {
  try {
    // console.log(req.body);
    const gift = new giftModel(req.body);
    // console.log(gift);
    await gift.save();
    return res.status(201).send({
      success: true,
      message: "New Gift Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Gift API",
      error,
    });
  }
};

const deleteGiftController = async (req, res) => {
  try {
    // console.log(req.params.id);
    await giftModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting",
      error,
    });
  }
};

const updateGiftController = async (req, res) => {
  try {
    const { id } = req.params;
    const { giftName, point, remain } = req.body;
    // console.log(req.body);
    await giftModel.findByIdAndUpdate(id, { giftName, point, remain });
    return res.status(200).send({
      success: true,
      message: "Record Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating",
      error,
    });
  }
};

const updateUserPointController = async (req, res) => {
  try {
    const {id} = req.params;
    const {point} = req.body;
    // console.log(req.params);
    // console.log(req.body);
    await userModel.findByIdAndUpdate(
        id,
        {point},
        {new: true}
    );
    return res.status(200).send({
        success:true,
        message: "User point updated successfully",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating user point",
      error,
    });
  }
};

const GetUserToUpdatePointController = async (req, res) => {
  try {
    console.log(req.params.id);
    const userData = await userModel.findById(req.params.id);
    console.log(userData);
    console.log(userData.point);
    return res.status(200).send({
      success: true,
      message: "Get User from Id Succesfully",
      userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while take user",
      error,
    })
  }
}

module.exports = {
  GetGiftListController,
  createGiftController,
  deleteGiftController,
  updateGiftController,
  updateUserPointController,
  GetUserToUpdatePointController,
};
