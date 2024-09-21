import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchToken } from './cookie';

// Thunk to fetch token
export const fetchTokenAsync = createAsyncThunk('auth/fetchToken', async () => {
  const token = await fetchToken(); // Your token fetching logic here
  console.log("token in app slice:- ", token);
  return token;
});

const authCookieSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokenAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTokenAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        console.log("token state.token:- ", state.token);
      })
      .addCase(fetchTokenAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selector to get token from the state
export const selectToken = (state) => state.authCookieReducer.token; // This references the correct slice

export const { logout } = authCookieSlice.actions;
export default authCookieSlice.reducer;
