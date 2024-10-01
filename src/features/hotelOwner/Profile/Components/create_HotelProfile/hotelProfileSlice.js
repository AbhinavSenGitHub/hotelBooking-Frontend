
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';  
import { addHotel } from './hotelProfileAPI';  

const initialState = {  
  value: 0,  
  status: 'idle',  
  addHotelRes: null,  
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

// export const fetchCitiesSlice = createAsyncThunk(
//   'hotel/cities',
//   async ({dfsdf}) => {
    
//   }
// )


// Create hotel slice  
export const createHotelSlice = createSlice({  
  name: 'hotel',  
  initialState,  
  extraReducers: (builder) => {  
    builder  
      .addCase(addHotelAsync.pending, (state) => {  
        state.status = 'loading';  
      })  
      .addCase(addHotelAsync.fulfilled, (state, action) => {  
        state.status = 'idle';  
        state.addHotelRes = action.payload; // Here we should get the response  
        console.log("state.addHotelRes: ", state.addHotelRes); // Log what is returned  
      })   
  },  
});  


// Selector to select the added hotel response  
export const selectAddHotelRes = (state) => state.createHotelReducer.addHotelRes;  

export default createHotelSlice.reducer;  