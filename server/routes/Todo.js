const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/todo", async (req, res) => {
  try {
    const userId = req.user.id;
    const todo = await Todo.find({ user: userId });

    if (todo.length === 0) {
      return res
        .status(404)
        .json({ message: "No task found for the specified user." });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/todo", async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please fill in both title and description" });
    }

    const newTodo = new Todo({
      title,
      description,
      user: userId,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.log("Failed to save");
    res.status(400).json(err);
  }
});

router.delete("/todo/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (err) {
    console.error("Failed to delete todo:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/todo/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const existingTodo = await Todo.findById(todoId);

    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    existingTodo.title = title;
    existingTodo.description = description;

    const updatedTodo = await existingTodo.save();

    res.json(updatedTodo);
  } catch (err) {
    console.error("Failed to update todo:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
