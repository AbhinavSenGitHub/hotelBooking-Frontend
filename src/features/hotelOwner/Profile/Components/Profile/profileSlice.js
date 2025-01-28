import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCustomerBookings, getOwnerHotels, getRoomsByHotel, searchRoomByHotelId } from "./profileAPI"

const initialState = {
    value: 0,
    status: "idle",
    allHotels: null,
    allRoomsByHotel: null,
    searchedRooms: null,
    bookingResponse: null,
}

export const getOwnerHotelsAsync = createAsyncThunk(
    'display/getOwnerHotels',
    async ({token, query}) => {
        const response = await getOwnerHotels(token, query)
        return response.response
    }
 )

 export const getRoomsbyHotelAsync = createAsyncThunk(
    'display/getRoomsByHotel',
    async({token, id}) => {
        const response = await getRoomsByHotel(token, id)
        return response;
    }
 )

 export const searchRoomByHotelIdAsync = createAsyncThunk( 'display/searchRoomByHotelId',
    async({token, hotelId, data}) => {
        console.log(token, hotelId, data);
        const response = await searchRoomByHotelId(token, hotelId, data);
        return response
    }
 )

 export const getCustomerBookingsAsync = createAsyncThunk(
    'display/getCustomerBookings',
    async({token}) => {
        const response = await getCustomerBookings(token)
        return response;
    }
 )


 export const ownerHotelSlice = createSlice({
    name: 'ownerHotel',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getOwnerHotelsAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getOwnerHotelsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.allHotels = action.payload
        })
        .addCase(getRoomsbyHotelAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getRoomsbyHotelAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.allRoomsByHotel = action.payload
        })
        .addCase(searchRoomByHotelIdAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(searchRoomByHotelIdAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.searchedRooms = action.payload
        })
        .addCase(getCustomerBookingsAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getCustomerBookingsAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.bookingResponse = action.payload
        })
    }
 })

 export const selectOwnerHotel = (state) => state.ownerHotelReducer.allHotels
export const selectRoomsByHotel = (state) => state.ownerHotelReducer.allRoomsByHotel
export const selectSearchedRooms = (state) => state.ownerHotelReducer.searchedRooms
export const selectAllBooking = (state) => state.ownerHotelReducer.bookingResponse
 export default ownerHotelSlice.reducer;