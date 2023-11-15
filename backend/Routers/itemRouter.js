const express = require("express");
const itemRouter = express.Router();
const verifyToken = require("../middleware/authorization");

const {
    createItem,
    getAllItems,
    deleteItem,
    updateItem,
    getCategories,
    getItemsByCategory,
} = require("../controllers/itemController");



itemRouter.post("/create", verifyToken, createItem);
itemRouter.get("/", getAllItems);
itemRouter.get("/categories", getCategories);
itemRouter.get("/category/:category", getItemsByCategory);
itemRouter.delete("/:id", deleteItem);
itemRouter.put("/:id", updateItem);

module.exports = itemRouter;
