const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order (POST /api/orders)
router.post('/', async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ data: order });
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
});

// Verify Payment (POST /api/orders/verify)
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ msg: "Payment Success", success: true });
  } else {
    res.status(400).json({ msg: "Payment Verification Failed", success: false });
  }
});

module.exports = router;
