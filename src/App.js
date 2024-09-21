import React from 'react';
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


// hotel owner


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children: [
      { path: "/", element: <Home/> },
    ]
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/email-verify",
    element: <EmailVarification/>
  },

  // hotel owner
  {
    path: "/hotel-profile",
    element: <CreateHotelProfile/>
  },
  {
    path: "/room-profile",
    element: <CreateRoomProfile/>
  },
  {
    path: "/display-rooms",
    element: <DisplayRooms/>
  }
])

function App() {
  return (
    <div className="App ">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
