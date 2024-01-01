const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

const GetRequestController = async (req, res) => {
    try {
        const requestData = await inventoryModel.find({accepted: "process"});
        return res.status(200).send({
            success:true,
            message:"Request process Fetched Successfully",
            requestData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error in Get Request In Data",
            error
        });
    };
};

const UpdateRequestController = async(req, res) => {
    try {
        const {id} = req.params;
        const {accepted} = req.body;
        await inventoryModel.findByIdAndUpdate(
            id,
            {accepted},
            {new: true}
        );
        return res.status(200).send({
            success: true,
            message: "Update Request Succesfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error in Update Request",
            error
        });
    }
}

module.exports = {
    GetRequestController,
    UpdateRequestController
}
//////////////////////////////////////////////////////////