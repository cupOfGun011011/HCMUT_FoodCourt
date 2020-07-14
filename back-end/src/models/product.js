const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error("price need to be > 0");
      },
    },
    productID: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: Buffer,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.toJSON = function () {
  const product = this;
  const productObject = product.toObject();
  return productObject;
};

productSchema.pre("save", async function (next) {
  const product = this;
  next();
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
