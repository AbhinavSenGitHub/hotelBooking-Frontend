import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getRoomsbyHotelAsync, selectRoomsByHotel } from './profileSlice'
import { fetchToken } from '../../../../../common/cookie'
import ProfileRoomCard from './ProfileRoomCard'
import { selectToken } from '../../../../../common/fetchCookieData'

const HotelRoom = () => {
  const location = useLocation().state

  const roomByHotel = useSelector(selectRoomsByHotel)
  const userToken = useSelector(selectToken)
  console.log(location)

  const dispatch = useDispatch()
  useEffect(() => {

    const getRoom = async () => {

      dispatch(getRoomsbyHotelAsync({ token: userToken, id: location._id }))
    }
    getRoom()

  }, [dispatch])
  return (
    <div className='px-10'>

      <div className=' border-b py-8'>
        <h2 className='text-2xl'>{location.hotelName}</h2>
        <h2 className='text-lg text-gray-500'>{location.hotelAddress}</h2>
        <p>{location.hotelDescription}</p>
      </div>

      <div className='flex justify-between flex-wrap gap-3 my-8'>
        <from className="flex gap-3 flex-wrap">
          <input type="text" className='border-2 rounded-lg w-[300px]  px-2 py-2' placeholder='Enter the selected field' />
          <select className='border-2 px-2 rounded-lg'>
            <option>Select a searching filed</option>
            <option>floor number</option>
            <option>Room number</option>
          </select>
          <button className='bg-[#003580] text-white px-2 py-2  rounded-lg'>Search</button>
        </from>
        <button className='hover:bg-[#003580] border-2 px-2 py-2 rounded-lg hover:text-white hover:border-none transition-all duration-300 ease-in-out'>
          <Link to="/room-profile">Add new room</Link>
        </button>
      </div>
      <div className='my-16 grid gap-6 px-4 custom-706:grid-cols-2 custom-1010:grid-cols-3 custom-1314:grid-cols-4'>
        {Array.isArray(roomByHotel) && roomByHotel.map((item, index) => (
          <ProfileRoomCard image={item.roomImages[0]} roomNumber={item.roomNumber} floorNumber={item.floorNumber} capacity={item.capacity} items={item} price={item.price} status={item.isBooked} />
        ))}
      </div>
    </div>
  )
}

export default HotelRoom
