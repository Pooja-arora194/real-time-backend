const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Task",
  new mongoose.Schema(
    {
      title: String,
      status: { type: String, default: "Todo" },
      projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
      assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true },
  ),
);
