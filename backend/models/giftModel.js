const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema(
  {
    GiftName: {
      type: String,
      required: [true, "GiftName type require"],
      enum: [
        "bag",
        "bowl-set",
        "cactus",
        "glasses",
        "helmet",
        "laptop-bag",
        "shampoo",
        "succulent",
        "super-tepid",
        "tea-set",
        "teddy-octopus",
        "teddy",
      ],
    },
    Point: {
      type: Number,
      require: [true, "point is require"],
    },
    Remain: {
      type: Number,
      require: [true, "Remain is require"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Gift", giftSchema);
