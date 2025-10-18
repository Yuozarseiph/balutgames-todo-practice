// Step 1
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Step 2
app.use("/api/todos", todoRoutes);

module.exports = app;