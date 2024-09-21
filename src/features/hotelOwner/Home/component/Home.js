import React from 'react'
import home_img from "../image/home_image.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocation } from "@fortawesome/free-solid-svg-icons"
import GetHotel from './GetHotel'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

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
      <div className='h-[500px] bg-[#003580] flex flex-wrap justify-around pt-[10vh]'>

        <div className='text-white flex flex-col gap-6 px-10'>
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

      <div className='flex justify-center -mt-8 '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='h-fit py-1 px-1 rounded-lg top-60 flex flex-wrap items-center justify-center gap-1 bg-yellow-500 w-fit'>

            <div className='bg-white py-2 flex items-center  px-2 w-[300px]'>
              <label><FontAwesomeIcon icon={faLocation} className='text-gray-600 text-2xl ' /></label>
              <input type="text" {...register("city")} placeholder='Where you wish to go' className='py-2 px-4 ml-2 w-full' />
            </div>

            <div className='bg-white py-2 flex items-center  px-2 w-[350px]'>
              <label>
                {/* <FontAwesomeIcon icon={faCalendar} className='text-gray-600 
            text-2xl ' /> */}
                Start
              </label>
              <input type="date" {...register("checkinDate")} placeholder='Check in data' className='py-2 px-4 ml-2 w-full' />
            </div>

            <div className='bg-white flex items-center  px-2 w-[260px] py-2'>
              <label className=''>
                {/* <FontAwesomeIcon icon={faUser} className='text-gray-600 text-2xl'/> */}
                End
              </label>
              <input type="date" {...register("checkoutDate")} placeholder='Check out date' className='py-2  px-4 ml-2 w-full' />
            </div>

            <div>
            
                <button type="submit" className='bg-[#2c7bea] font-normal text-2xl py-3 px-4 text-white'>Search</button>
             
            </div>
          </div>
        </form>
      </div>

      <GetHotel />
    </div>
  )
}

export default Home
