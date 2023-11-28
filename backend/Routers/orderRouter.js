const express = require("express");
const orderRouter = express.Router();
const verifyToken = require("../middleware/authorization");


const { getAllOrders, deleteOrder } = require("../controllers/orderController");


orderRouter.get("/orders", getAllOrders);
orderRouter.delete("/orders/:id", deleteOrder );
module.exports = orderRouter;