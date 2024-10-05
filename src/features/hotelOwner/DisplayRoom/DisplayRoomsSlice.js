import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllRooms } from './DisplayRoomsAPI';

const initialState = {
  value: 0,
  status: 'idle',
  allRooms: null
};

export const getAllRoomsAsync = createAsyncThunk(
    'display/getAllRooms',
    async () => {
        const response = await getAllRooms()
        return response
    }
)

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoomsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllRoomsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allRooms = action.payload;
      });
  },
});

export const selectAllRooms = (state) => state.displayReducer.allRooms;
export default displaySlice.reducer;
