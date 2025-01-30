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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthCookieAsync, selectCookie } from './features/auth/authSlice';
import BookingDetails from './features/hotelOwner/Profile/Components/Profile/BookingDetails';
import Description1 from './features/hotelOwner/RoomDescription/Description1';
import SuccessPage from './features/hotelOwner/RoomDescription/SuccessBooking';
import GetPlaceDetails from './features/hotelOwner/Home/component/GetPlaceDetails';
import CardContent from './features/hotelOwner/Home/CardContent/CardContent';
import ProtectedRouter from './features/auth/ProtectedRouter';


// hotel owner

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/display-rooms", element: <DisplayRooms /> },
      { path: "/description", element: <Description /> },
      {
        path: "/description1",
        element: 
        <ProtectedRouter>
          <Description1 />
        </ProtectedRouter>
      },
      { path: "/edit-room-details", element: 
      <ProtectedRouter>
      <EditRoomDescription />
      </ProtectedRouter> 
      },
      { path: "/edit-hotel-details", element: 
        <ProtectedRouter>
        
        <EditHotel /> 
        </ProtectedRouter>
        },
      { path: "/place-content", element: <CardContent /> },
      {
        path: "/owner-profile",
        element: 
        <ProtectedRouter>
        <Profile />
        </ProtectedRouter>
      },
      { path: "/owner-hotel-rooms", element: 
        <ProtectedRouter>
      <HotelRoom />
      </ProtectedRouter>
     },
      { path: "/place-details", element: <GetPlaceDetails /> },
      { path: "/booking-details", element: 
        <ProtectedRouter>
      <BookingDetails /> 
      </ProtectedRouter>
      },
      { path: "/cancle", element: <div>Payment canceled.</div> },

      { path: "/success", element: <SuccessPage /> }
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
  const authState = useSelector(selectCookie)

  const dispatch = useDispatch()
  console.log("authState", authState)
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
