const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    value: { type: Number, required: true },
    category: { type: String, required: true, default: "other" },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
