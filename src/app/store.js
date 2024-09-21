import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import authCookieSlice from "../common/fetchCookieData"
import  createHotelSlice  from '../features/hotelOwner/Profile/Components/create_HotelProfile/hotelProfileSlice';
import createRoomSlice  from '../features/hotelOwner/Profile/Components/create_RoomProfile/roomProfileSlice';
import counterSlice from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // auth reducer
    auth: authReducer,
    authCookieReducer: authCookieSlice,
    // add hotel
    createHotelReducer: createHotelSlice,
    //add room
    createRoomReducer: createRoomSlice
  },
});
