import React from 'react'
import home_img from "../image/home_image.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocation } from "@fortawesome/free-solid-svg-icons"
import GetHotel from './GetHotel'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import HotelCard from './HotelCard'
import SearchBar from './SearchBar'
import Clients from './Clients'
import LocationCard from './LocationCard'

const Home = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log("data from the search ", data)
  }
  return (
    <div className=''>
      <div className='h-auto xl:h-[500px] bg-[#003580] flex flex-wrap custom-919:flex-nowrap justify-around pt-[10vh]'>

        <div className='text-white flex flex-col md:mt-10 gap-6 px-10'>
          <h1 className=' text-5xl'>Travel Made Easy, <br />Hosting Made Simple</h1>
          <p>Find your perfect stay or share your space with travelers. <br /> Our platform makes booking and hosting simple, fast, and reliable.</p>
          <div className='flex gap-4 my-3'>
            <button className='bg-white text-[#003580] rounded-xl px-3 py-2 font-medium'>Book a Hotel</button>
            <button className='bg-white text-[#003580] rounded-xl px-3 py-2 font-medium'>List your Hotel</button>
          </div>
        </div>
        <div className='px-10 -mt-12 '>
          <img src={home_img} className='h-[400px] w-[500px]rounded-lg' />
        </div>
      </div>

      <div className='flex justify-center mt-10 xl:-mt-8 '>
        <SearchBar/>
      </div>

      <GetHotel />
      <Clients/>
      <LocationCard/>
      <HotelCard/>
    </div>
  )
}

export default Home
