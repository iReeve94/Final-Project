const Item = require("../models/itemModel");
const cloudinary = require("../cloudinary");
require("dotenv").config();

const createItem = async(req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        //let result = await cloudinary.uploader.upload
        const newItem = {
            name,
            description,
            price,
            image,
            category,
        };
        let item = await Item.create(newItem);
        res.send({ msg: "New item is created", newItem});
  } catch(error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error"})
  }
};



const getAllItems =  async(req, res) => {
    try {
        let items = await Item.find();
        res.status(200).send(items)
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error"})
    }
}

const updateItem =  async (req, res) => {
    try {
        let clientValue = req.body;
        await Item.updateOne({_id: req.params.id }, clientValue);
        res.status(200).send({ msg: "Item updated successfully"});
    } catch(error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error"});
    }
};

const deleteItem = async(req, res) => {
    try {
        await Item.deleteOne({_id: req.params.id });
        res.status(200).send({ msg: "Item deleted successfully"});
    } catch(error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error"});
    }
};

module.exports = {createItem, getAllItems, updateItem, deleteItem};