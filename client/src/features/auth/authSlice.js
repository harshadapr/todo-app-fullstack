import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from 'react-dotenv';

export const signup = createAsyncThunk('auth/signup', async (data) => {
  const response = await fetch(`${env.REACT_APP_BACKEND_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const login = createAsyncThunk('auth/login', async (data) => {
  const response = await fetch(`${env.REACT_APP_BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    message: null
  },
  reducers: {},
//   extraReducers: {
//     [signup.fulfilled]: (state, action) => {
//       // handle successful signup, possibly set token/user
//       console.log("action.payload");
//     },
//     [login.fulfilled]: (state, action) => {
//       state.token = action.payload.token;
//     },
//   },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.user = action.meta.arg.username;
      // If there are other fields you want to store, you can do so here
    })
    .addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      // Assuming the server's response for login includes a username field
      state.user = action.meta.arg.username; // Set user to the username returned from the server during login
      state.message = "User logged in successfully."; // Or any other message you want
    })
    // ... any other reducers
  }

});

export default authSlice.reducer;
