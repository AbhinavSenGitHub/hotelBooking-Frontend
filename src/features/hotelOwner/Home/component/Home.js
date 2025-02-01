import React from 'react'
import home_img from "../image/home_image.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocation } from "@fortawesome/free-solid-svg-icons"
import GetHotel from './GetHotel'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import HotelCard from './HotelCard'
import SearchBar from './SearchBar'
import Clients from './Clients'
import LocationCard from './LocationCard'
import { useSelector } from 'react-redux'
import { selectCookie } from '../../../auth/authSlice'
import Footer from './Footer'

const Home = () => {

  const user = useSelector(selectCookie)
  console.log("user: ", user)
  const {
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
 const handNavigate = () => {
  navigate('/display-rooms')
 }

 const handleClick = (item) => {
  if(!user){
    navigate("/login")
  }else{
    if(item === "roomBooking"){
      navigate("/display-rooms")
    }else{
      navigate("/hotel-profile")
    }
  }
 }

  return (
    <div className=''>
      <div className='h-auto xl:h-[500px] bg-[#003580] flex flex-wrap custom-919:flex-nowrap justify-around pt-[10vh]'>

        <div className='text-white flex flex-col md:mt-10 gap-6 px-10'>
          <h1 className=' text-5xl'>Travel Made Easy, <br />Hosting Made Simple</h1>
          <p>Find your perfect stay or share your space with travelers. <br /> Our platform makes booking and hosting simple, fast, and reliable.</p>
          <div className='flex gap-4 my-3'>
            {user?.userType === 'customer' && <Link to="/display-rooms" className='bg-white text-[#003580] rounded-xl px-3 py-2 font-medium transform transition duration-150 active:scale-95'>Book a Room</Link>}
            {user?.userType === 'hotelOwner' && <Link to="/owner-profile" className='bg-white text-[#003580] rounded-xl px-3 py-2 font-medium transform transition duration-150 active:scale-95'>List your Hotel</Link>}
          </div>
          {!user &&
            <div className='flex gap-4 my-3'>
              <button onClick={() => handleClick("roomBooking")} className='bg-white text-[#003580] rounded-xl px-3 py-2 font-medium transform transition duration-150 active:scale-95' >Book a Room</button>
              <button onClick={() => handleClick("roomBooking")} className='bg-white text-[#003580] rounded-xl px-3 py-2 font-medium transform transition duration-150 active:scale-95'>List your Hotel</button>
            </div>
          }
        </div>
        <div className='px-10 -mt-12 '>
          <img src={home_img} className='h-[400px] w-[500px]rounded-lg' />
        </div>
      </div>

      <div className='flex justify-center mt-10 xl:-mt-8 ' onClick={handNavigate}>
        {/* <SearchBar /> */}
        <form>
          <div className='h-fit py-1 px-1 rounded-lg flex flex-wrap items-center justify-center gap-1 xl:bg-yellow-500 w-fit'>

            <div className='bg-white py-2 border-2 border-yellow-300 xl:border-0 rounded-lg xl:rounded-none flex items-center  px-2 w-[300px] '>
              <label><FontAwesomeIcon icon={faLocation} className='text-gray-600 text-2xl' /></label>
              <select type="text" placeholder='Where you wish to go' className='py-2 px-4 ml-2 w-full ' >
                <option>City / State</option>
                {/* {location && location.map((item, index) => (
                                        <option className='py-2 px-2 border'>{item.name}, {item.state}</option>
                                    ))} */}
              </select>
            </div>

            <div className='bg-white py-2 border-2 border-yellow-300 xl:border-0 rounded-lg xl:rounded-none flex items-center  px-2 w-[350px]'>
              <label>
                Start
              </label>
              <input type="date"
                min={new Date().toISOString().split("T")[0]} // Setting the minimum date to today
                placeholder='Check in data' className='py-2 px-4 ml-2 w-full' />
            </div>
            <div className='bg-white flex items-center  px-2 border-2 border-yellow-300 xl:border-0 rounded-lg xl:rounded-none w-[260px] py-2'>
              <label className=''>
                End
              </label>
              <input type="date"
                placeholder='Check out date' className='py-2  px-4 ml-2 w-full' />
            </div>
            <div>
              <button type="submit" className='bg-[#2c7bea] font-normal text-2xl rounded-lg xl:rounded-none lg:w-full py-3 px-4 text-white transform transition duration-150 active:scale-95'>Search</button>
            </div>
          </div>
        </form>
      </div>

      <GetHotel />
      <Clients />
      <LocationCard />
      <HotelCard />
      <Footer/>
    </div>
  )
}

export default Home
