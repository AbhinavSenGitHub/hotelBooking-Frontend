import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileRoomCard = ({image, roomNumber, floorNumber, capacity, items, price, status}) => {

    const naviagte = useNavigate()

    const handleClick = (items) => {
        naviagte("/edit-room-details", {state: items})
    }
  return (
    <div>
      <div className="border w-full sm:w-[300px] rounded-xl mx-auto">
        <div className="w-full h-[200px] sm:h-[250px] lg:h-[200px] rounded-t-xl bg-gray-500 overflow-hidden">
          <img src={image} alt="Hotel" className="w-full h-full object-cover" />
        </div>
        <div className="px-2 py-4 flex flex-col gap-2">
        <div className='flex justify-between'>
          <p className="text-sm sm:text-base font-medium">Room Number: {roomNumber}</p>
          <p className='text-red-600 '>{status ? <p>Booked</p> : <p>Available</p>}</p>
          </div>
          <p className="text-sm">Room floor: {floorNumber}</p>
          <p className="text-sm">capacity: {capacity}</p>
          <p className="text-yellow-500">⭐⭐⭐⭐</p>
          <div className='flex justify-between gap-2'>
          <button onClick={() => handleClick(items)} className=" w-1/2 border p-2 rounded-lg bg-[#003580] text-white hover:bg-[#0d274c] text-sm sm:text-base">
          <FontAwesomeIcon className='mr-2' icon={faPen}/>
              Edit Room
          </button>
          <button onClick={() => handleClick(items)} className="w-1/2 border hover:border-none p-2 rounded-lg  hover:text-white hover:bg-[#003580] text-sm sm:text-base transition-all duration-300 ease-in-out">
              {price}/day
          </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileRoomCard
