import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  token: '',
};

// Load from localStorage if available
const storedAuth = localStorage.getItem('auth');
if (storedAuth) {
  const parsedAuth = JSON.parse(storedAuth);
  initialState.user = parsedAuth.user;
  initialState.token = parsedAuth.token;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = '';
      localStorage.removeItem('auth');
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
