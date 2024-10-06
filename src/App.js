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
import Description from './features/hotelOwner/RoomDescription/Description';


// hotel owner


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children: [
      { path: "/", element: <Home/> },
      { path: "/display-rooms", element: <DisplayRooms/>},
      { path: "/description", element: <Description/>},
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
 
])

function App() {
  return (
    <div className="App ">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
