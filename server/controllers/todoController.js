const Todo = require('../models/Todo');
const User = require('../models/User');

// Pagination settings
const ITEMS_PER_PAGE = 10;


exports.list = async (req, res) => {
  try {
    const todos = req.user.todos;  // Fetch todos from the logged-in user
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos.' });
  }
};

exports.create = async (req, res) => {
  try {
    const todo = {
      text: req.body.text,
      completed: false
    };

    req.user.todos.push(todo); // Add todo to the logged-in user's todos
    await req.user.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo.' });
  }
};

exports.update = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoToUpdate = req.user.todos.id(todoId);

    if (!todoToUpdate) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    if (req.body.text !== undefined) {
      todoToUpdate.text = req.body.text;
    }
    
    if (req.body.completed !== undefined) {
      todoToUpdate.completed = req.body.completed;
    }

    await req.user.save();

    res.status(200).json(todoToUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo.' });
  }
};

exports.delete = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoToDelete = req.user.todos.id(todoId);

    if (!todoToDelete) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    todoToDelete.remove();
    await req.user.save();

    res.status(200).json({ message: 'Todo deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo.' });
  }
};

exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    const filteredTodos = req.user.todos.filter(todo =>
      todo.text.toLowerCase().includes(query.toLowerCase())
    );

    res.status(200).json(filteredTodos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search todos.' });
  }
};
