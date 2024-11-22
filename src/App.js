import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from './features/auth/component/Signup';
import Login from "./features/auth/component/Login"
import EmailVarification from './features/auth/component/EmailVarification';
import CreateHotelProfile from './features/hotelOwner/Profile/Components/create_HotelProfile/CreateHotelProfile';
import CreateRoomProfile from './features/hotelOwner/Profile/Components/create_RoomProfile/CreateRoomProfile';
import DisplayRooms from './features/hotelOwner/DisplayRoom/components/DisplayRooms';
import Home from './features/hotelOwner/Home/component/Home';
import Navbar from './features/hotelOwner/Home/component/Navbar';
import Description from './features/hotelOwner/RoomDescription/Description';
import Profile from './features/hotelOwner/Profile/Components/Profile/Profile';
import HotelRoom from './features/hotelOwner/Profile/Components/Profile/HotelRoom';
import EditRoomDescription from './features/hotelOwner/RoomDescription/EditRoomDescription';
import EditHotel from './features/hotelOwner/EditHotel/EditHotel';
import { useDispatch } from 'react-redux';
import { fetchAuthCookieAsync } from './common/fetchCookieData';


// hotel owner


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/display-rooms", element: <DisplayRooms /> },
      { path: "/description", element: <Description /> },
      { path: "/edit-room-details", element: <EditRoomDescription /> },
      { path: "/edit-hotel-details", element: <EditHotel /> },
      {
        path: "/owner-profile",
        element: <Profile />
      },
      {path: "/owner-hotel-rooms", element: <HotelRoom/>}
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/email-verify",
    element: <EmailVarification />
  },

  // hotel owner

  {
    path: "/hotel-profile",
    element: <CreateHotelProfile />
  },
  {
    path: "/room-profile",
    element: <CreateRoomProfile />
  },

])

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchAuthCookieAsync());
}, [dispatch]);

  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
