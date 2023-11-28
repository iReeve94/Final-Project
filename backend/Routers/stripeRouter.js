const express = require('express');
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const stripeRouter = express.Router();
const { createOrders } = require("../controllers/orderController");
const verifyToken = require("../middleware/authorization");

const endpointSecret = "whsec_017d06d9504e115618261c2e23790f15a31237b5d250a8313becf581d8f357b7";

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Payment succeeded for payment intent:', paymentIntent);
}

stripeRouter.post('/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const cartSummary = req.body.map(item => ({
      title: item.title,
      price: item.price,
    }));

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user.email,
        cartSummary: JSON.stringify(cartSummary),
      },
    });

    const line_items = req.body.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['GR', 'CY'],
      },
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.YOUR_DOMAIN}/checkout-success`,
      cancel_url: `${process.env.YOUR_DOMAIN}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).send({ msg: 'Internal server error (create-checkout-session)' });
  }
});

stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    console.log("Webhook verified");
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      const customerId = paymentIntentSucceeded.customer;

      stripe.customers.retrieve(customerId, (err, customer) => {
        if (err) {
          console.error(`Error retrieving customer: ${err.message}`);
          res.status(500).send({ error: 'Error retrieving customer' });
        } else {
          console.log('Customer retrieved:', customer);
          createOrders(customer, paymentIntentSucceeded);
        }
      });

      break;

    // ... handle other event types

    default:
      //console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
});

module.exports = stripeRouter;