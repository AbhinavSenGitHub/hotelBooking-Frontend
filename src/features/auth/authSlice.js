import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, googleAuth, loginUser, logoutUser, resendOTP, verification } from './authAPI';
import { fetchAuthCookie } from '../../common/cookie';

const initialState = {
  value: 0,
  authResponse: null,
  token: null,
  cookie: null,
  loading: false,
  otpResponse: null,
  otpStatus: null,
  otpResendStatus: null,
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
    console.log("response: ", response)
    return response
  }
)

export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    const response = await logoutUser()
    console.log("response: ", response)
    return response;
  }
)

export const googleAuthAsync = createAsyncThunk(
  "auth/googleAuth",
  async ({ userType }) => {
    const response = await googleAuth(userType)
    console.log("google auth in slice", response)
    return response;
  }
)

export const fetchAuthCookieAsync = createAsyncThunk("auth/fetchAuthCookie", async () => {
  const cookie = await fetchAuthCookie()
  console.log("what is the cookie:", cookie)
  return cookie
})

export const verificationAsync = createAsyncThunk("auth/email-verification", async ({userData}) => {
  const response = await verification(userData)
  console.log("response in auth slice:", response)
  return response
})
export const resendOTPAsync = createAsyncThunk("auth/email-resend-otp", async ({userData}) => {
  const response = await resendOTP(userData)
  console.log(" resendOTP response in auth slice:", response)
  return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.authResponse = action.payload
        state.cookie = action.payload?.userData
        state.token = action.payload?.token
        console.log("state.cookie singup : ", state.authResponse)
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.authResponse = action.payload
        state.cookie = action.payload?.userData
        state.token = action.payload?.token
        console.log("state.cookie login: ", action.payload.userData)
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.authResponse = null
        state.cookie = null
        state.token = null
      })
      .addCase(googleAuthAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(googleAuthAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.authResponse = action.payload
        console.log("state.cookie", action.payload)
        state.token = action.payload?.token;
        state.cookie = action.payload;
      })
      .addCase(fetchAuthCookieAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthCookieAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authResponse = action.payload
        state.token = action.payload?.token;
        state.cookie = action.payload;
        console.log("state.cookiess", action.payload)
      })
      .addCase(verificationAsync.pending, (state) => {
        state.otpStatus = 'pending';
      })
      .addCase(verificationAsync.fulfilled, (state, action) => {
        state.otpStatus = 'idle';
        state.otpResponse = action.payload
        console.log("state.otpResponse", state.otpResponse);
      })
      .addCase(resendOTPAsync.pending, (state) => {
        state.otpResendStatus = 'pending';
      })
      .addCase(resendOTPAsync.fulfilled, (state, action) => {
        state.otpResendStatus = 'idle';
        
        state.otpResponse = action.payload
        console.log("state.otpResponse", state.otpResponse);
      })
  },
});

export const selectUserResponse = (state) => state.auth.authResponse;
export const selectStatus = (state) => state.auth.status
export const selectOTPStatus = (state) => state.auth.otpStatus
export const selectOTPResendStatus = (state) => state.auth.otpResendStatus
export const selectToken = (state) => state.auth.token;
export const selectCookie = (state) => state.auth.cookie; 
export const selectOTPResponse = (state) => state.auth.otpResponse; 
export default authSlice.reducer;
