const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    imageUrl: String,
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