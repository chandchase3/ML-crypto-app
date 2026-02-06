// /src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';

// Initialize token from localStorage if it exists
const tokenFromStorage = localStorage.getItem('token');
const emailFromStorage = localStorage.getItem('email');

const initialState = {
  token: tokenFromStorage || null,
  email: emailFromStorage || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Network error' });
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Network error' });
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.email = null
      state.loading = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.email = action.payload.email
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('email', action.payload.email);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.email = action.payload.email
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('email', action.payload.email);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
