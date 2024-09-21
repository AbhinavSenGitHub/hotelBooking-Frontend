import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from './authAPI';

const initialState = {
  value: 0,
  authResponse: {},
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData) 
    console.log("response: ", response)
    return response
  }
)

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await loginUser(userData)
    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "panding"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.authResponse = action.payload
        console.log("state.authReponse: ", state.authResponse)
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "panding"
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.authResponse = action.payload
      })
  },
});

export const selectUserResponse = (state) => state.auth.authResponse;

export default authSlice.reducer;
