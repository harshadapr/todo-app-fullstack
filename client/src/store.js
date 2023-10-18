import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import todosReducer from './features/todos/todosSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    modal: modalReducer,
  },
});
