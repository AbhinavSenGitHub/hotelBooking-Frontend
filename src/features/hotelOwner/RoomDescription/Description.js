import { faBath, faCab, faDog, faParking, faTv, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Loader from '../../../common/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createBookingAsync, selectStatus } from './BookingApis/bookingSlice'
import { selectToken, selectUserResponse } from '../../auth/authSlice'
import { loadStripe } from '@stripe/stripe-js';
import ImageModal from './ImageModal'

const Description = () => {

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const location = useLocation()
  const userToken = useSelector(selectToken)
  const loader = useSelector(selectStatus)
  const userResponse = useSelector(selectUserResponse)
  const memoizedLocation = useMemo(() => location.state, [location.state])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal on image click
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const navigate = useNavigate()
  console.log("location in description", memoizedLocation)
  setValue("amount", memoizedLocation.price)
  setValue("roomId", memoizedLocation._id)
  setValue("hotelId", memoizedLocation?.hotelDetails?._id)
  const onSubmit = async (data) => {
    if (!userResponse) {
      navigate("/login")
    }
    const resp = await dispatch(createBookingAsync({ token: userToken, data: data }))
    
    if (loader === 'idle') {
      // navigate("/owner-profile/")
    }
    console.log("data", data)
  }

  const length = (memoizedLocation.hotelDetails.images.length + memoizedLocation.roomImages.length) - 5
  return (
    <div>
      {loader === 'pending' &&
        <div>
          <Loader />
        </div>}
      {memoizedLocation && <div className='my-10 px-4 sm:px-16 '>
        {memoizedLocation.hotelDetails && <div className='mb-10'>
          <h1 className='text-2xl font-medium'>{memoizedLocation.hotelDetails.hotelName}</h1>
          <p className='text-lg text-gray-600'>{memoizedLocation.hotelDetails.hotelAddress} {memoizedLocation.hotelDetails.city}, {memoizedLocation.hotelDetails.pincode}</p>
        </div>}

        {/* Main grid container */}
        <div className='grid grid-cols-1 lg:grid-cols-4 lg:gap-6'>

          {/* Left section */}
          <div className='lg:col-span-3 flex flex-col gap-3 mb-8'>

            {/* images */}

            <div className='flex flex-wrap gap-3'>
              <div className='md:flex fle-wrap custom-1427:flex-col  gap-3'>
                <div className='h-[250px] lg:w-[250px] mb-3'><img className=' h-[250px] object-cover  rounded-lg' src={memoizedLocation.roomImages[0]} alt='room image' onClick={handleImageClick} /></div>
                <div className='h-[250px] lg:w-[250px]'><img className=' h-full w-full object-cover  rounded-lg' src={memoizedLocation.roomImages[1]} alt='room image' onClick={handleImageClick} /></div>


              </div>

              <div className='custom-1427:w-fit w-full'>
                <div className='custom-1427:h-[350px] md:h-[350px] h-[250px] custom-1427:w-full sm:w-3/4  mb-3'>
                  <img className=' h-full w-full rounded-lg' src={memoizedLocation.roomImages[2]} onClick={handleImageClick} />
                </div>
                <div className='flex flex-wrap gap-3'>
                  <div className='lg:h-[160px] h-[250px]'>
                    <img className=' h-full w-full rounded-lg' src={memoizedLocation.roomImages[3]} onClick={handleImageClick} />
                  </div>
                  <div className='relative lg:h-[160px] h-[250px]'>
                    <img className='h-full w-full rounded-lg' src={memoizedLocation.roomImages[4]} onClick={handleImageClick} />
                    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg' onClick={handleImageClick}>
                      <span className='text-white text-lg font-semibold cursor-pointer' onClick={handleImageClick}>{length-1}+ images</span>
                    </div>
                  </div>
                  {/* Modal Component */}
                  <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} hotelImage={memoizedLocation.hotelDetails.images} roomImage={memoizedLocation.roomImages}>
                    {/* You can add the images or any other content here */}
                    <img src={memoizedLocation.roomImages[4]} alt="Room Large" className="w-full h-auto" />
                  </ImageModal>
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
            <div className="text-gray-800 px-2">
              <h2 className="text-2xl font-semibold my-4">Booking Details</h2>
              <p className="text-lg font-medium">Room Number: <span className="font-normal">{memoizedLocation.roomNumber}</span></p>
              <p className="text-lg font-medium">Floor Number: <span className="font-normal">{memoizedLocation.floorNumber}</span></p>
              <p className="text-lg font-medium">Room Capacity: <span className="font-normal">{memoizedLocation.capacity}</span></p>
              <p className="text-lg font-medium">
                Availability: <span className={`font-semibold ${memoizedLocation.isBooked ? 'text-red-500' : 'text-green-500'}`}>
                  {memoizedLocation.isBooked ? 'Booked' : 'Available'}
                </span>
              </p>
              <p className="text-lg font-medium">Number of Beds: <span className="font-normal">{memoizedLocation.numberOfBed}</span></p>
            </div>
            <div className=''>
              <h2 className='text-xl font-medium my-3'>Room Description</h2>
              <p>{memoizedLocation.description}</p>
            </div>
            <div>
              <h2 className='text-xl font-medium my-3' >Hotel Description</h2>
              <p>{memoizedLocation.description}</p>
            </div>

          </div>

          {/* Right section (Only with this room) */}
          <div className='lg:w-fit  h-fit flex flex-col gap-3'>
            <div className='border px-2 rounded-xl py-2'>
              <h2 className='text-xl font-medium'>Amenities</h2>
              <div className="px-1 clear-start">
                {memoizedLocation &&
                  memoizedLocation.keyPoints.map((item, index) => (
                    <div key={index} className=" rounded-lg p-3 my-2 shadow-sm">
                      <ul className="list-disc list-inside text-gray-700 space-y-1 px-3">
                        {item.point1 && <li className="font-medium">{item.point1}</li>}
                        {item.point2 && <li>{item.point2}</li>}
                        {item.point3 && <li>{item.point3}</li>}
                        {item.point4 && <li>{item.point4}</li>}
                        {item.point5 && <li>{item.point5}</li>}
                      </ul>
                    </div>
                  ))}
              </div>
              <div className="px-1 clear-start">
                {memoizedLocation &&
                  memoizedLocation.hotelDetails
                    .keyPoints.map((item, index) => (
                      <div key={index} className=" rounded-lg p-3 my-2 shadow-sm">
                        <ul className="list-disc list-inside text-gray-700 space-y-1 px-3">
                          {item.point1 && <li className="font-medium">{item.point1}</li>}
                          {item.point2 && <li>{item.point2}</li>}
                          {item.point3 && <li>{item.point3}</li>}
                          {item.point4 && <li>{item.point4}</li>}
                          {item.point5 && <li>{item.point5}</li>}
                        </ul>
                      </div>
                    ))}
              </div>

            </div>

            <div className='py-2 rounded-xl'>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className='flex  flex-wrap'>
                  <div className='flex flex-col gap-2 pr-3 w-1/2'>
                    <label className='px-1'>Check in date :</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full text-[#9ca3af] px-2 py-2 border rounded-lg ${errors.checkinDate ? 'border-red-500' : ''}`}
                      {...register("checkinDate", { required: 'Check-in date is required' })}
                    />
                    {errors.checkinDate && <p className="text-red-500 text-sm">{errors.checkinDate.message}</p>}
                  </div>

                  <div className='flex flex-col mb-3 gap-2 pr-3 w-1/2'>
                    <label className='px-1'>Check out date :</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full text-[#9ca3af] px-2 py-2 border rounded-lg ${errors.checkoutDate ? 'border-red-500' : ''}`}
                      {...register("checkoutDate", { required: 'Check-out date is required' })}
                    />
                    {errors.checkoutDate && <p className="text-red-500 text-sm">{errors.checkoutDate.message}</p>}
                  </div>
                </div>

                <div className='flex gap-3 flex-wrap'>
                  <div className='flex flex-col w-36 my-3 gap-2'>
                    <label className='px-1'>Check in time :</label>
                    <input
                      type="time"
                      className={`w-full text-[#9ca3af] px-2 py-2 border rounded-lg ${errors.checkinTime ? 'border-red-500' : ''}`}
                      {...register("checkinTime", { required: 'Check-in time is required' })}
                    />
                    {errors.checkinTime && <p className="text-red-500 text-sm">{errors.checkinTime.message}</p>}
                  </div>

                  <div className='flex flex-col w-36 my-3 gap-2'>
                    <label className='px-1'>Check out time :</label>
                    <input
                      type="time"
                      className={`w-full text-[#9ca3af] px-2 py-2 border rounded-lg ${errors.checkoutTime ? 'border-red-500' : ''}`}
                      {...register("checkoutTime", { required: 'Check-out time is required' })}
                    />
                    {errors.checkoutTime && <p className="text-red-500 text-sm">{errors.checkoutTime.message}</p>}
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
                        value <= memoizedLocation.capacity || `Number of guests must not exceed ${memoizedLocation.capacity}`,
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
                  <label htmlFor="bookingName">Name :</label>
                  <input
                    type='text'
                    id="bookingName"
                    {...register('bookingName', { required: 'Name is required' })}
                    className={`rounded-lg border py-2 px-3 ${errors.bookingName ? 'border-red-500' : ''}`}
                    placeholder='Name'
                  />
                  {errors.bookingName && <p className="text-red-500 text-sm">{errors.bookingName.message}</p>}
                </div>

                {/* Email Field */}
                <div className='flex flex-col gap-2 mb-3'>
                  <label htmlFor="bookingEmail">Email :</label>
                  <input
                    type='email'
                    id="bookingEmail"
                    {...register('bookingEmail', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    className={`rounded-lg border py-2 px-3 ${errors.bookingEmail ? 'border-red-500' : ''}`}
                    placeholder='Email'
                  />
                  {errors.bookingEmail && <p className="text-red-500 text-sm">{errors.bookingEmail.message}</p>}
                </div>

                {/* Mobile Number Field */}
                <div className='flex flex-col gap-2 mb-3'>
                  <label htmlFor="bookingContact">Mobile number :</label>
                  <input
                    type='number'
                    id="bookingContact"
                    {...register('bookingContact', {
                      required: 'Mobile number is required',
                      minLength: { value: 10, message: 'Mobile number must be at least 10 digits' },
                      maxLength: { value: 10, message: 'Mobile number must not exceed 10 digits' },
                    })}
                    className={`rounded-lg border py-2 px-3 ${errors.bookingContact ? 'border-red-500' : ''}`}
                    placeholder='Mobile number'
                  />
                  {errors.bookingContact && <p className="text-red-500 text-sm">{errors.bookingContact.message}</p>}
                </div>

                <button type="submit" className='border rounded-lg my-3 w-full bg-[#003580] text-white px-2 py-2 transform transition duration-300 hover:scale-105 active:scale-95'>
                  Book Now ${memoizedLocation.price} / day
                </button>
              </form>



            </div>
          </div>

        </div>
      </div>}
    </div>
  )
}

export default Description
