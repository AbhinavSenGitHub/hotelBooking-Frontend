
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';  
import { addHotel, getAllLocaton } from './hotelProfileAPI';  

const initialState = {  
  value: 0,  
  status: 'idle',  
  addHotelRes: null,  
  location: null
};  

// Async thunk for adding a hotel  
export const addHotelAsync = createAsyncThunk(  
  'hotel/profile',  
  async ({ accessToken, hotelData }) => {  
    const response = await addHotel(accessToken, hotelData);  
    console.log("Response in slice: ", response); // Log the response from the API  
    return response;   
  }  
);  

export const getAllLocationAsync = createAsyncThunk("hotel/location", async () => {
  const response = await getAllLocaton()
  console.log("response in async: ", response)
  return response
})


// Create hotel slice  
export const createHotelSlice = createSlice({  
  name: 'hotel',  
  initialState,  
  extraReducers: (builder) => {  
    builder  
      .addCase(addHotelAsync.pending, (state) => {  
        state.status = 'pending';  
      })  
      .addCase(addHotelAsync.fulfilled, (state, action) => {  
        state.status = 'idle';  
        state.addHotelRes = action.payload; // Here we should get the response  
      })   
      .addCase(getAllLocationAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getAllLocationAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.location = action.payload.data
      })
  },  
});  


// Selector to select the added hotel response  
export const selectAddHotelRes = (state) => state.createHotelReducer.addHotelRes;  
export const selectLocation = (state) => state.createHotelReducer.location
export const selectHotelStatus = (state) => state.createHotelReducer.status
export default createHotelSlice.reducer;  