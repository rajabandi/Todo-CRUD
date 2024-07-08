const Todolist = require('../models/todos.model')

const getTodolists = async (req, res) => {
    try {
        const todolit = await Todolist.find({});
        res.status(200).json(todolit)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err.message)
    }
}

const getTodolist = async (req, res) => {
    try {
        const { id } = req.params;
        const todolit = await Todolist.findById(id);
        res.status(200).json(todolit)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err.message)
    }
}

const createTodolist = async (req, res) => {
    try {
        const todolit = await Todolist.create(req.body);
        res.status(200).json(todolit)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err.message)
    }
}

const updateTodolist = async (req, res) => {
    try {
        const { id } = req.params;
        const todolit = await Todolist.findByIdAndUpdate(id, req.body);
        if (!todolit) {
            return res.status(404).json({ message: 'Todolist not found' });
        }
        const updateTodolist = await Todolist.findById(id);
        res.status(200).json(updateTodolist)
    }
    catch (err) {
        res.status(500).json({ message: err.message })

    }
}

const deleteTodolist = async (req, res) => {
    try {
        const { id } = req.params;
        const todolit = await Todolist.findByIdAndDelete(id);
        if (!todolit) {
            return res.status(404).json({ message: 'Todolist not found' });
        }
        res.status(200).json({ message: 'Todolist deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err.message)
    }
}

module.exports = {
    getTodolists,
    getTodolist,
    createTodolist,
    deleteTodolist,
    updateTodolist
}