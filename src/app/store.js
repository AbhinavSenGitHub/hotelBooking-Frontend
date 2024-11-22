import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import authCookieSlice from "../common/fetchCookieData"
import  createHotelSlice  from '../features/hotelOwner/Profile/Components/create_HotelProfile/hotelProfileSlice';
import createRoomSlice  from '../features/hotelOwner/Profile/Components/create_RoomProfile/roomProfileSlice';
import counterSlice from '../features/counter/counterSlice';
import  displaySlice  from '../features/hotelOwner/DisplayRoom/DisplayRoomsSlice';
import  ownerHotelSlice  from '../features/hotelOwner/Profile/Components/Profile/profileSlice';

export const store = configureStore({
  reducer: {
    // auth
    auth: authReducer,
    authCookieReducer: authCookieSlice,

    // hotel owner
    ownerHotelReducer: ownerHotelSlice,
    //hotel    
    createHotelReducer: createHotelSlice,

    //room
    createRoomReducer: createRoomSlice,

    //display
    displayReducer: displaySlice
  },
});
