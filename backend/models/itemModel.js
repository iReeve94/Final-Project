const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    description: String,
    imgURL: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;