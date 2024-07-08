const express = require('express');
const router = express.Router();
const { getTodolist, getTodolists, createTodolist, deleteTodolist, updateTodolist } = require('../controllers/todos.controllers')


router.get('/', getTodolists);

router.get('/:id', getTodolist);

router.post('/', createTodolist);

router.put('/:id', updateTodolist);

router.delete('/:id', deleteTodolist);
 
module.exports = router;


