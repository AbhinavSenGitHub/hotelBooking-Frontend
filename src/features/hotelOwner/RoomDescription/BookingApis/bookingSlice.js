
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBooking } from "./bookingAPI"

const initialState = {
    status: "idle",
    bookingResponse: null,
}
export const createBookingAsync = createAsyncThunk('room/edit-room-profile', 
    async ({token, data}) => {
        const response = await createBooking(token, data)
        console.log("Response in slice: ", response)
        return response
    }
)

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createBookingAsync.pending, (state) => {
             state.status = 'pending'
        })
        .addCase(createBookingAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.bookingResponse = action.payload
        })
        // .addCase(deleteRoomAsync.pending, (state) => {
        //      state.status = 'pending'
        // })
        // .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        //     state.status = "idle";
        //     state.deleteRoom = action.payload
        // })
    },
})

export const selectBookingResponseAsync = (state) => state.bookingReducer.status
export const selectStatus = (state) => state.bookingReducer.status
export default bookingSlice.reducer;