const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: "customer",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password need to be more strong");
      },
    },
    balance: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0)
          throw new Error("balance need to be greater or equal to 0");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "owner",
});

userSchema.statics.findCretidentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("Wrong email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong email or password");
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.generateUserOrders = async function () {
  const user = this;
  await user
    .populate({
      path: "orders",
    })
    .execPopulate();
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

/////////// Hash password

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await user.populate("tasks").execPopulate();
  user.tasks.forEach((task) => task.remove());
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
