
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';  
import { addHotel, getAllLocaton, getSearchedRooms } from './hotelProfileAPI';  

const initialState = {  
  value: 0,  
  status: 'idle',  
  addHotelRes: null,  
  searchRoom: null,
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
  return response
})

export const getSearchedRoomsAsync = createAsyncThunk("hotel/searchRoom", async ({location, checkIn, checkOut}) => {
  const response = await getSearchedRooms(location, checkIn, checkOut)
  return response
})

// Create hotel slice  
export const createHotelSlice = createSlice({  
  name: 'hotel',  
  initialState,  
  reducers : {
    resetSearchRoom: (state) => {
      state.searchRoom = null; // Resetting searchRoom to null
    },
  },
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
      .addCase(getSearchedRoomsAsync.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getSearchedRoomsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.searchRoom = action.payload
      })
  },  
});  


// Selector to select the added hotel response  
export const selectAddHotelRes = (state) => state.createHotelReducer.addHotelRes;  
export const selectLocation = (state) => state.createHotelReducer.location
export const selectHotelStatus = (state) => state.createHotelReducer.status
export const selectSearchRoom = (state) => state.createHotelReducer.searchRoom
export const { resetSearchRoom } = createHotelSlice.actions;
export default createHotelSlice.reducer;  