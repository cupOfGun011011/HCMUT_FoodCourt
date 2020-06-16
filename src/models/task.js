const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

taskSchema.methods.toJSON = function() {
  const task = this;
  const taskObject = task.toObject();
  return taskObject;
};

taskSchema.pre("save", async function(next) {
  const task = this;
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
