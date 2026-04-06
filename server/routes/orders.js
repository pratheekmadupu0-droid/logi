const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// In-memory order storage (Simplified for demo, replace with DB)
let orders = [];

// Create Order (POST /api/orders)
router.post('/', async (req, res) => {
  const { amount, items, userInfo, paymentMethod } = req.body;
  try {
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    
    // For COD, we save immediately. For Razorpay, we'll confirm in verify route.
    if (paymentMethod === 'cod') {
        const newOrder = {
          id: order.id,
          receipt: order.receipt,
          amount,
          items,
          userInfo,
          paymentMethod,
          status: 'Confirmed (COD)',
          createdAt: new Date().toISOString()
        };
        orders.unshift(newOrder);
    }
    
    res.json({ data: order });
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
});

// Verify & Save Razorpay Order
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, items, userInfo } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    const newOrder = {
        id: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount,
        items,
        userInfo,
        paymentMethod: 'Razorpay',
        status: 'Paid',
        createdAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    res.json({ msg: "Payment Success", success: true });
  } else {
    res.status(400).json({ msg: "Payment Verification Failed", success: false });
  }
});

// Get All Orders (Admin View)
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
