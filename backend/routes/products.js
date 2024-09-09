const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminAuth = require("../middleware/admin");

// Create a new product (Admin only)
router.post("/add", adminAuth, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a product (Admin only)
router.put("/update/:id", adminAuth, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not Found with this ID" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a product (Admin only)
router.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
