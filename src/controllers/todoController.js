// Step 2
const { Todo } = require("../models/Todo.js");
const mongoose = require("mongoose");

async function createTodo(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      user: req.user.id,
      title,
      description: description || "",
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Create todo failed" });
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID format" });
    }

    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (dueDate !== undefined)
      update.dueDate = dueDate ? new Date(dueDate) : null;
    if (completed !== undefined) update.completed = completed;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: update },
      { new: true }
    );

    if (!todo) {
      console.log(`Todo not found - ID: ${id}, User: ${req.user.id}`);
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json(todo);
  } catch (error) {
    console.error("Update todo error:", error);
    return res.status(500).json({ message: "Update todo failed" });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Delete todo failed" });
  }
}

async function listTodos(req, res) {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createTodo, updateTodo, deleteTodo, listTodos };
