const Orders = require("../models/orders");

const createOrders = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cartSummary);

  const newOrders = await Orders.create({
    userId: customer.metadata.userId,
    customerId: data.customer,
    products: items.map(item => ({
        title: item.title,
        price: item.price,
      })),
    shipping: data.shipping_details,
    paymentIntentId: data.payment_intent,
    total: data.amount_total,
    payment_status: data.payment_status,
  });

  try {
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Orders.find();

    // Check if allOrders is an array and has length greater than 0
    if (!Array.isArray(allOrders) || allOrders.length === 0) {
      return res.status(200).json(allOrders);
    }

    // Convert total back to dollars
    const ordersWithTotalInDollars = allOrders.map(order => ({
      ...order.toObject(),
      // If 'total' is in cents, divide it by 100 to get dollars
      total: order.total / 100,
    }));

    res.status(200).json(ordersWithTotalInDollars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Orders.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createOrders, getAllOrders, deleteOrder };