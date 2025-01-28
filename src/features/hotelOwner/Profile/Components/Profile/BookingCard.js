import React from 'react'
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ item }) => {

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const navigate = useNavigate()
  const handleClick = (data) => {
    navigate("/booking-details", { state: data })
  }
  console.log("items in booking card", item)
  return (
    <div className="max-w-sm  bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Room Image */}
      <div className="relative">
        <img
          src={item.roomDetails.roomImages[0]} // Replace with room image URL
          alt="Room"
          className="h-48 w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Hotel Name and Address */}
        <h2 className="text-lg font-semibold text-gray-800">
          {item.hotelDetails.hotelName} {/* Replace with variable */}
        </h2>
        <p className="text-sm text-gray-500">
        {item.hotelDetails.hotelAddress} {/* Replace with variable */}
        </p>

        {/* Booking Dates */}
        <div className="mt-4">

          <p className="text-sm text-gray-600">
            <span className="font-medium">Check-in:</span> {formatDate(item.checkinDate)} {/* Replace */}
          </p>
          <div className='flex justify-between'>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Check-out:</span> {formatDate(item.checkoutDate)}  {/* Replace */}
          </p>
          <p onClick={() => handleClick(item)} className='text-blue-700 cursor-pointer'>View Details</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default BookingCard
