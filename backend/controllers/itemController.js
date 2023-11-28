const Item = require("../models/itemModel");
const Category = require("../models/categoryModel"); // Import the Category model
require("dotenv").config();

const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Assuming category is the name of the category, find its ObjectId
    const categoryObject = await Category.findOne({ name: category });
    
    if (!categoryObject) {
      return res.status(404).send({ msg: "Category not found" });
    }

    const items = await Item.find({ category: categoryObject._id });
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error (getItemsByCategory)" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to retrieve categories" });
  }
};

const createItem = async (req, res) => {
  try {
    if (!req.user || !req.user.email || req.user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).send({ msg: "Unauthorized to create items" });
    }

    let { title, description, price, imageUrl, category } = req.body;

    // Check if the category already exists
    let categoryObject = await Category.findOne({ name: category });

    // If not, create a new category
    if (!categoryObject) {
      categoryObject = await Category.create({ name: category });
    }

    let newItem = {
      title,
      price,
      description,
      imageUrl,
      category: categoryObject._id,
    };

    let createdItem = await Item.create(newItem);
    res.send(createdItem);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error creating Item " });
  }
};

const getAllItems = async (req, res) => {
  try {
    let items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    let clientValue = req.body;
    await Item.updateOne({ _id: req.params.id }, clientValue);
    res.status(200).send({ msg: "Item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = { createItem, getAllItems, updateItem, deleteItem, getCategories, getItemsByCategory };