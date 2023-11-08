const mongoose = require("mongoose");
//const cloudinary =


const itemSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: String,
        imgURL: String,
        category: String,
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;