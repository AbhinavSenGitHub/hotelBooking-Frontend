import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProfileCard = ({ image, address, hotelName, numberOfRoom, items }) => {

  const navigate = useNavigate()

  const handleClick = (item) => {
    navigate("/owner-hotel-rooms", { state: item })
  }

  const handleEdit = (item) => {
    navigate("/edit-hotel-details", {state: item})
  }
  return (
    <div>
      <div className="border w-full sm:w-[300px] rounded-xl mx-auto">
        <div className="w-full h-[200px] sm:h-[250px] lg:h-[200px] rounded-t-xl bg-gray-500 overflow-hidden">
          <img src={image} alt="Hotel" className="w-full h-full object-cover" />
        </div>
        <div className="px-2 py-4 flex flex-col gap-2">
          <p className="text-sm sm:text-base font-medium">{hotelName}</p>
          <h2 className="text-xs sm:text-sm lg:text-base text-gray-700">{address}</h2>
          <p className="text-sm">Number of rooms: {numberOfRoom}</p>
          <p className="text-yellow-500">⭐⭐⭐⭐</p>
          <div className='flex gap-2'>
            <button onClick={() => handleClick(items)} className="border p-2 rounded-lg bg-[#003580] text-white  text-sm sm:text-base transform transition duration-150 w-1/2 active:scale-95"
            >
              View details
            </button>
            <button onClick={() => handleEdit(items)} className="border p-2 rounded-lg hover:bg-[#003580] hover:text-white  text-sm sm:text-base transform transition duration-150 w-1/2 active:scale-95"
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileCard
