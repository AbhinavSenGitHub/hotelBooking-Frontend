import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteRoomAsync } from '../../../RoomDescription/EditRoomSlice'
import DeleteModel from './DeleteModel'

const ProfileRoomCard = ({ token, id, image, roomNumber, floorNumber, capacity, items, price, status }) => {

  const naviagte = useNavigate()
  const dispatch = useDispatch()
  
  const handleClick = () => {
    
    naviagte("/edit-room-details", { state: items })
  }
  // const handleViewDetails = () => {
    
  //   naviagte("/description1", { state: items })
  // }

  const handleDeleteRoom = () => {
    console.log("delete room id", id)
    setOpen(true)
    // dispatch(deleteRoomAsync({accessToken: token, roomId: id}))

  }

  const [isOpen, setOpen] = useState(false)
  const openModal= () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  return (
    <div>
    <DeleteModel isOpen={isOpen} onClose={closeModal} objName={'room'} id={id} token={token} name={roomNumber} />
      <div className="border w-full sm:w-[300px] rounded-xl mx-auto">
        <div className="w-full h-[200px] sm:h-[250px] lg:h-[200px] rounded-t-xl bg-gray-500 overflow-hidden relative">
          <img src={image} alt="Hotel" className="w-full h-full object-cover" />
          <div onClick={openModal}
            className="absolute top-2 right-2 bg-white text-black font-extrabold rounded-full p-1 px-2 hover:bg-white focus:outline-none  cursor-pointer text-sm sm:text-base transition-all duration-300 ease-in-out ">
            ✕
          </div>
        </div>
        <div className="px-2 py-4 flex flex-col gap-2">
          <div className='flex justify-between'>
            <p className="text-sm sm:text-base font-medium">Room Number: {roomNumber}</p>
            <p className='text-green-700 '>{status ? <p>Booked</p> : <p>Available</p>}</p>
          </div>
          <p className="text-sm">Room floor: {floorNumber}</p>
          <p className="text-sm">capacity: {capacity}</p>
          <p className="text-yellow-500">⭐⭐⭐⭐</p>
          <div className='flex justify-end gap-2'>
            <button onClick={() => handleClick(items)} className=" w-full border p-2 rounded-lg bg-[#003580] text-white hover:bg-[#0d274c] text-sm sm:text-base transform transition duration-150 active:scale-95">
              <FontAwesomeIcon className='mr-2' icon={faPen} />
              Edit Room
            </button>
            {/* <button onClick={() => handleViewDetails(items)} className="w-1/2 border hover:border-none p-2 rounded-lg  hover:text-white hover:bg-[#003580] text-sm sm:text-base transition-all duration-300 ease-in-out ">
              View Details
            </button> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileRoomCard
