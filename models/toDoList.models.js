const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoListSchema = new Schema({
    todoItem: String,
    finished: Boolean,
})

module.exports = TodoListSchema;