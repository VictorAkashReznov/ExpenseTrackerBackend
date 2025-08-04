const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
// ADD EXPENSE

router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET ALL AN EXPENSES

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: error.message });
  }
});

// UPDATE AN EXPENSE

router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE AN EXPENSE

router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
