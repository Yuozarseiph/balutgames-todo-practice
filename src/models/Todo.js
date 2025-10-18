// Step 2
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title : {type: String, required: true, trim: true},
    completed : {type: Boolean, default: false},
    description : {type: String, trim: true},
    dueDate : {type: Date},
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', todoSchema);
module.exports = { Todo };