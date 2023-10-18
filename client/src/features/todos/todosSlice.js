import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from 'react-dotenv';

const BASE_URL = env.REACT_APP_BACKEND_URL;

const handleResponse = async (response) => {
  if (response.status === 401) {
    throw new Error('Unauthorized');
  }
  return response.json();
};

// Fetch all todos for the authenticated user
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
});

// Create a new todo
export const createTodo = createAsyncThunk('todos/createTodo', async (todo, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  return handleResponse(response);
});

// Update a todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async (data, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`${BASE_URL}/todos/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
});

// Delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
});

// Search for todos
export const searchTodos = createAsyncThunk('todos/searchTodos', async (query, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`${BASE_URL}/todos/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',  // 'idle', 'loading', 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // When we start fetching todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';
    });

    // When fetching todos is successful
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'idle';
      state.todos = action.payload;
    });

    // If there was an error fetching todos
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // When we successfully create a todo
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });

    // Updating a todo
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });

    // Deleting a todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    });

    // Searching for todos
    builder.addCase(searchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});


export default todosSlice.reducer;
