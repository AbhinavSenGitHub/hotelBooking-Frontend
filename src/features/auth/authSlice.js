import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from './authAPI';

const initialState = {
  value: 0,
  user: false,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  'counter/fetchCount',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "panding"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload.user
      })
  },
});

export const { increment } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
