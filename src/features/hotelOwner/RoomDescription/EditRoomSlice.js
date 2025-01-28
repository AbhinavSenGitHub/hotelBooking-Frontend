
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteRoom, editRoom } from "./EditRoomAPI"

const initialState = {
    status: "idle",
    updateRoom: null,
    deleteRoom: null,
}
export const editRoomAsync = createAsyncThunk('room/edit-room-profile', 
    async ({accessToken, roomData, roomId}) => {
        const response = await editRoom(accessToken, roomData, roomId)
        console.log("Response in slice: ", response)
        return response
    }
)
export const deleteRoomAsync = createAsyncThunk('room/delete-room-profile', 
    async ({accessToken, roomId}) => {
        const response = await deleteRoom(accessToken, roomId)
        console.log("Response in slice: ", response)
        return response
    }
)

export const editRoomSlice = createSlice({
    name: "editRoom",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(editRoomAsync.pending, (state) => {
             state.status = 'pending'
        })
        .addCase(editRoomAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.updateRoom = action.payload
        })
        .addCase(deleteRoomAsync.pending, (state) => {
             state.status = 'pending'
        })
        .addCase(deleteRoomAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.deleteRoom = action.payload
        })
    },
})
export const selectEditRoomAsync = (state) => state.editRoomReducer.status
export const selectStatus = (state) => state.editRoomReducer.status
export default editRoomSlice.reducer;