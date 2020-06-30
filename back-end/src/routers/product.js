const express = require("express");
const router = new express.Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");

router.post("/product", auth, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.status(404).send();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server is now unavailable");
  }
});

module.exports = router;
