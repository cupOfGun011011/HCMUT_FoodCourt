const express = require("express");
const router = new express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const auth = require("../middleware/auth");

router.post("/order", auth, async (req, res) => {
  try {
    const orderInfo = await Product.findOne({ productID: req.body.productID });

    if (!orderInfo) throw new Error("Product is unavailable");

    const order = new Order({
      name: orderInfo.name,
      price: orderInfo.price,
      ammount: req.body.ammount,
      productID: orderInfo.productID,
      owner: req.user._id,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/orders", auth, async (req, res) => {
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

router.get("/orders/:id", auth, async (req, res) => {
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
