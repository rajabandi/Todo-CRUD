const mongoose = require('mongoose');

const TodolistSchema = mongoose.Schema({
    titile: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('Todolist', TodolistSchema);