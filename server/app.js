const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoController = require('./controllers/todoController');
const authController = require('./controllers/authController');
const authenticate = require('./middleware/authenticate');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.post('/signup', authController.signup);
app.post('/login', authController.login);

// Protect routes using the authenticate middleware
app.use(authenticate);

// Routes
app.get('/todos', todoController.list);
app.get('/todos/search', todoController.search);
app.post('/todos', todoController.create);
app.put('/todos/:id', todoController.update);
app.delete('/todos/:id', todoController.delete);


mongoose.connect('mongodb+srv://masai-database-user:i0bEmgatULnL6tcG@cluster0.1xr3jxi.mongodb.net/Todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
