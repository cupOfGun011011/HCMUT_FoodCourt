const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
    ammount: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error("ammount need to be > 0");
      },
    },
    orderType: {
      type: String,
      required: true,
      default: "ordering",
      validate(value) {
        if (value !== "ordered" && value !== "ordering")
          throw new Error("orderType is expected to be ordered or ordering");
      },
    },
    productID: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

orderSchema.methods.toJSON = function () {
  const order = this;
  const orderObject = order.toObject();
  return orderObject;
};

orderSchema.pre("save", async function (next) {
  const order = this;
  next();
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
