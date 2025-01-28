import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthCookie, fetchToken } from './cookie';



export const fetchAuthCookieAsync = createAsyncThunk("auth/fetchAuthCookieAsync", async () => {
  const cookie = await fetchAuthCookie()
  console.log("what is the cookie:" , cookie);
  return cookie
})

const authCookieSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState: {
    token: null,
    cookie: null,
    loading: false,
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthCookieAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthCookieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.cookie = action.payload;
        console.log("state.cookie",action.payload)
      })
  },
});

// // Selector to get token from the state
export const selectToken = (state) => state.authCookieReducer.token;
export const selectCookie = (state) => state.authCookieReducer.cookie; 

export default authCookieSlice.reducer;
