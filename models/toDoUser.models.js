const mongoose = require('mongoose');
const { Schema } = mongoose;
const TodoListSchema = require('./toDoList.models');

const UserSchema = new Schema({
  first: {
    type: String,
    require: true,
    trim: true,
  },
  last: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  psw: {
    type: String,
    required: true,
    trim: true,
  },
  todosList: [TodoListSchema],
});

const ToDoUser = mongoose.model('ToDoUser', UserSchema);

module.exports = ToDoUser;