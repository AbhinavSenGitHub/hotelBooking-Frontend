import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getOwnerHotels, getRoomsByHotel } from "./profileAPI"

const initialState = {
    value: 0,
    status: "idle",
    allHotels: null,
    allRoomsByHotel: null
}

export const getOwnerHotelsAsync = createAsyncThunk(
    'display/getOwnerHotels',
    async ({token}) => {
        const response = await getOwnerHotels(token)
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
    }
 })

 export const selectOwnerHotel = (state) => state.ownerHotelReducer.allHotels
export const selectRoomsByHotel = (state) => state.ownerHotelReducer.allRoomsByHotel

 export default ownerHotelSlice.reducer;