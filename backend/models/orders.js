const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    customerId: {
        type: String,
    },
   products: [
    {
        title: String,
        price: Number,
        description: String,
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
    },
   ],
   shipping: {
    type: Object,
    required: true,
   },
   total: {
        type: Number,
        required: true,
   },
   payment_status: {
    type: String,
    required: true,
   },
},{timestamps: true})

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;