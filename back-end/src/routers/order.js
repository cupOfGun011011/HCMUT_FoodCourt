const express = require("express");
const router = new express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const authenticate = require("../middleware/authenticate");

router.post("/order", authenticate, async (req, res) => {
  try {
    const productInfo = await Product.findOne({
      productID: req.body.productID,
    });

    if (!productInfo) throw new Error("Product is unavailable");

    const order = new Order({
      name: productInfo.name,
      price: productInfo.price,
      ammount: req.body.ammount,
      productID: productInfo.productID,
      owner: req.user._id,
      image: productInfo.image,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/orders", authenticate, async (req, res) => {
  try {
    const user = req.user;
    await user.generateUserOrders();
    if (!user.orders) return res.status(404).send();
    res.send(user.orders);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get("/orders/:id", authenticate, async (req, res) => {
  try {
    const _id = req.params.id;

    const order = await order.findOne({ _id: _id, owner: req.user._id });
    if (!order) return res.status(404).send();
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server is now unavailable");
  }
});

module.exports = router;
