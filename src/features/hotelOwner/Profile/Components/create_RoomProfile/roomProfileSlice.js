import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createRoom } from "./roomProfileAPI"

const initialState = {
    status: "idle",
    createRoomRes: null,
}

export const createRoomAsync = createAsyncThunk('room/room-profile', 
    async ({accessToken, roomData}) => {
        const response = await createRoom(accessToken, roomData)
        console.log("Response in slice: ", response)
        return response
    }
)

export const createRoomSlice = createSlice({
    name: "createRoom",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createRoomAsync.pending, (state) => {
             state.status = 'loading'
        })
        .addCase(createRoomAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.createRoomRes = action.payload
        })
    },
})
export const selectRoomRes = (state) => state.createRoomReducer.createRoomRes
export default createRoomSlice.reducer;