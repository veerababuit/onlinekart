const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get wishlist products
router.get('/wishlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add product to wishlist
router.post('/wishlist', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const user = await User.findById(req.user.id);
    user.wishlist.push(product._id);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
