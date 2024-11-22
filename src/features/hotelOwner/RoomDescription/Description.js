import { faBath, faCab, faDog, faParking, faTv, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"

const Description = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const location = useLocation().state
  console.log("location in description", location)

  const onSubmit = async (data) => {
    console.log("data", data)
  }
  return (
    <>
      {location && <div className='my-10 px-4 sm:px-16 '>
        {location.hotelDetails && <div className='mb-10'>
          <h1 className='text-2xl font-medium'>{location.hotelDetails.hotelName}</h1>
          <p className='text-lg text-gray-600'>{location.hotelDetails.hotelAddress}</p>
        </div>}

        {/* Main grid container */}
        <div className='grid grid-cols-1 lg:grid-cols-4 lg:gap-6'>

          {/* Left section */}
          <div className='lg:col-span-3 flex flex-col gap-3'>

            {/* images */}

            <div className='flex flex-wrap gap-3'>
              <div className='md:flex fle-wrap custom-1427:flex-col  gap-3'>
                <div><img className=' h-[250px] object-cover mb-3 rounded-lg' src={location.roomImages[0]} alt='room image' /></div>
                <div><img className=' h-[250px] object-cover  rounded-lg' src={location.roomImages[1]} alt='room image' /></div>


              </div>

              <div className='custom-1427:w-fit w-full'>
                <img className='custom-1427:h-[350px] md:h-[350px] h-[250px] custom-1427:w-full sm:w-3/4  mb-3 rounded-lg' src={location.roomImages[2]} />
                <div className='flex flex-wrap gap-3'>
                  <img className='lg:h-[150px] h-[250px] rounded-lg' src={location.roomImages[3]} />
                  <img className='lg:h-[150px] h-[250px] rounded-lg' src={location.roomImages[4]} />
                  <img className='lg:h-[150px] h-[250px] rounded-lg' src={location.roomImages[6]} />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className='flex gap-3 flex-wrap'>
              <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                <FontAwesomeIcon className='text-xl' icon={faWifi} /> <h2 className='text-xl'>Wifi</h2>
              </div>
              <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                <FontAwesomeIcon className='text-xl' icon={faTv} /> <h2 className='text-xl'>Flat Screen T.V.</h2>
              </div>
              <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                <FontAwesomeIcon className='text-xl' icon={faCab} /> <h2 className='text-xl'>Cab</h2>
              </div>
              <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                <FontAwesomeIcon className='text-xl' icon={faParking} /> <h2 className='text-xl'>Parking</h2>
              </div>
              <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                <FontAwesomeIcon className='text-xl' icon={faDog} /> <h2 className='text-xl'>Pet Allowed</h2>
              </div>
            </div>

            {/* Descriptions */}
            <div className=''>
              <h2 className='text-xl font-medium my-3'>Room Description</h2>
              <p>{location.description}</p>
            </div>
            <div>
              <h2 className='text-xl font-medium my-3' >Hotel Description</h2>
              <p>{location.description}</p>
            </div>

          </div>

          {/* Right section (Only with this room) */}
          <div className='lg:w-fit  h-fit flex flex-col gap-3'>
            <div className='border px-2 rounded-xl py-2'>
              <h2 className='text-xl font-medium'>Amenities</h2>
              <ul className='px-1 clear-start'>
                {location && location.keyPoints.map((item, index) => (
                  <React.Fragment key={index}>
                    <li>{item.point1}</li>
                    <li>{item.point2}</li>
                    <li>{item.point3}</li>
                    <li>{item.point4}</li>
                    <li>{item.point5}</li>
                  </React.Fragment>
                ))}
              </ul>
            </div>

            <div className='py-2 rounded-xl'>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className='flex gap-3 flex-wrap'>
                  <div className='flex flex-col gap-2'>
                    <label className='px-1'>Check in date :</label>
                    <input type="Date" className='w-full text-[#9ca3af] px-2 py-2 border rounded-lg' {...register("checkinDate")} />
                  </div>
                  <div className='flex flex-col mb-3 gap-2'>
                    <label className='px-1'>Check out date :</label>
                    <input type="Date" className='w-full text-[#9ca3af] px-2 py-2 border rounded-lg' {...register("checkoutDate")} />
                  </div>
                </div>

                <div className='flex gap-3 flex-wrap'>
                  <div className='flex flex-col w-36 my-3 gap-2'>
                    <label className='px-1'>Check in time :</label>
                    <input type="Time" className='w-full text-[#9ca3af] px-2 py-2 border rounded-lg' {...register("checkinTime")} />
                  </div>

                  <div className='flex flex-col w-36 my-3 gap-2'>
                    <label className='px-1'>Check out time :</label>
                    <input type="Time" className='w-full text-[#9ca3af] px-2 py-2 border rounded-lg' {...register("checkoutTime")} />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='px-1'>Number of Guests :</label>
                  <input
                    type="Number"
                    className='w-full px-2 py-2 border rounded-lg'
                    {...register("numberOfGuests", {
                      required: "Number of guests is required",
                      validate: (value) =>
                        value <= location.capacity || `Number of guests must not exceed ${location.capacity}`,
                    })}
                    placeholder='Number of Guests'
                  />
                  {/* Display error message if validation fails */}
                  {errors.numberOfGuests && (
                    <p className="text-red-500 text-sm">
                      {errors.numberOfGuests.message}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-2 my-3'>
                  <label>Name :</label>
                  <input type='text' className='rounded-lg border py-2 px-3' placeholder='Name' />
                </div>

                <div className='flex flex-col gap-2 mb-3'>
                  <label>Email  :</label>
                  <input type='email' className='rounded-lg border py-2 px-3' placeholder='Email' />
                </div>

                <div className='flex flex-col gap-2 mb-3'>
                  <label>Mobile number :</label>
                  <input type='number' className='rounded-lg border py-2 px-3' placeholder='number' />
                </div>

                <button type="submit" className='border rounded-lg my-3 w-full bg-[#003580] text-white px-2 py-2 transform transition duration-300 hover:scale-105 active:scale-95'>
                  Book Now
                </button>
              </form>



            </div>
          </div>

        </div>
      </div>}
    </>
  )
}

export default Description
