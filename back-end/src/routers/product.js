const express = require("express");
const router = new express.Router();
const Product = require("../models/product");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const multer = require("multer");
const sharp = require("sharp");
const productImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ["jpg", "jpeg", "png"];
    // file.jpg
    let isValidType = false;
    for (const type of allowedTypes) {
      if (file.originalname.endsWith(type)) {
        isValidType = true;
        break;
      }
    }
    if (!isValidType) return cb(new Error("Please upload image file"));
    return cb(undefined, true);
  },
});
router.post(
  "/product",
  authenticate,
  (req, res, next) => {
    authorize(req, res, next, "manager");
  },
  productImage.single("productImage"),
  async (req, res) => {
    try {
      const product = new Product({
        ...req.body,
      });
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      product.image = buffer;
      await product.save();
      res.send();
      res.status(201).send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);
router.get("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if (!product || !product.image) throw new Error();
    res.set("Content-Type", "image/png");
    res.send(product.image);
  } catch (error) {
    console.log(error);
    res.status(404).send();
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
