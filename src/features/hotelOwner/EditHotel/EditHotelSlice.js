
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteHotel, editHotel } from "./EditHotelApi"

const initialState = {
    status: "idle",
    updateHotel: null,
    deleteHotel: null
}
export const editHotelAsync = createAsyncThunk('hotel/edit-hotel-profile', 
    async ({accessToken, hotelData, hotelId}) => {
        const response = await editHotel(accessToken, hotelData, hotelId)
        console.log("Response in slice: ", response)
        return response
    }
)
export const deleteHotelAsync = createAsyncThunk('hotel/delete-hotel-profile', 
    async ({accessToken, hotelId}) => {
        const response = await deleteHotel(accessToken, hotelId)
        console.log("Response in slice: ", response)
        return response
    }
)

export const editHotelSlice = createSlice({
    name: "editHotel",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(editHotelAsync.pending, (state) => {
             state.status = 'pending'
        })
        .addCase(editHotelAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.updateHotel = action.payload
        })
        .addCase(deleteHotelAsync.pending, (state) => {
             state.status = 'pending'
        })
        .addCase(deleteHotelAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.deleteHotel = action.payload
        })
    },
})
export const selectEditHotelAsync = (state) => state.editHotelReducer.updateHotel
export const selectStatus = (state) => state.editHotelReducer.status
export const selectDeleteHotelAsync = (state) => state.editHotelReducer.deleteHotel
export default editHotelSlice.reducer;