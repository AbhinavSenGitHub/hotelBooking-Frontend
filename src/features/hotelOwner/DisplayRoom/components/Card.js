import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllRoomsAsync, selectAllRooms } from '../DisplayRoomsSlice'
import { Link, useNavigate } from "react-router-dom"
import { selectSearchRoom } from '../../Profile/Components/create_HotelProfile/hotelProfileSlice'
const Card = () => {
  const dispatch = useDispatch()
  const searchData = useSelector(selectSearchRoom)
  const allRooms = useSelector(selectAllRooms)
  console.log("all rooms is in card", searchData)
  useEffect(() => {
    if (allRooms === null) {

      dispatch(getAllRoomsAsync())
    }
  }, [dispatch])

  const navigate = useNavigate()
  const handleClick = (item) => {
    console.log("item, ", item)
    navigate("/description", { state: item })
  }
  const handleClick1 = (hotel, room) => {
    navigate("/description1", { state: { hotel, room } })
  }
  return (
    <div>
      {!searchData ? <div className='flex gap-6 flex-wrap justify-center mt-10 cursor-pointer'>
        {allRooms && allRooms.rooms.map((item, index) => (
          <div className='border rounded-xl w-full sm:w-[48%] lg:w-[293px] mb-10'>
            <div className='w-full h-[200px] sm:h-[250px] lg:h-[200px] rounded-t-xl bg-gray-500 overflow-hidden'>
              <img
                className='object-cover w-full h-full rounded-t-xl'
                src={item.roomImages[0]}
                alt={`${item.hotelDetails.hotelName} room`}
              />
            </div>

            <div className='px-3 py-2 flex flex-col gap-2'>
              <div>
                <h3 className='text-black font-medium text-lg'>{item.hotelDetails.hotelName}</h3>
                <h3 className='text-xs text-gray-700'>{item.hotelDetails.hotelAddress}</h3>
              </div>

              <p>⭐⭐⭐⭐</p>
              <div className='flex justify-between'>
                <p className='flex items-center'>{item.price}/per night</p>
                <button onClick={() => handleClick(item)} className='bg-[#003580] py-2 px-2 text-white rounded-lg' to="/description">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> :
        <div className='flex gap-6 flex-wrap justify-center mt-10 cursor-pointer'>
          {searchData &&
            searchData?.map((hotel) =>
              hotel.rooms?.map((room, index) => (
                <div
                  key={`${hotel._id}-${index}`} // Unique key for each room
                  className='border rounded-xl w-full sm:w-[48%] lg:w-[293px] mb-10'
                >
                  {/* Room Image */}
                  <div className='w-full h-[200px] sm:h-[250px] lg:h-[200px] rounded-t-xl bg-gray-500 overflow-hidden'>
                    <img
                      className='object-cover w-full h-full rounded-t-xl'
                      src={room.roomImages[0]}
                      alt={`${hotel.hotelName} room`}
                    />
                  </div>

                  {/* Hotel and Room Details */}
                  <div className='px-3 py-2 flex flex-col gap-2'>
                    {/* Hotel Name and Address */}
                    <div>
                      <h3 className='text-black font-medium text-lg'>{hotel.hotelName}</h3>
                      <h3 className='text-xs text-gray-700'>{hotel.hotelAddress}</h3>
                    </div>

                    {/* Star Rating */}
                    <p>⭐⭐⭐⭐</p>

                    {/* Price and Booking */}
                    <div className='flex justify-between'>
                      <p className='flex items-center'>{room.price}/per night</p>
                      <button
                        onClick={() => handleClick1(hotel, room)}
                        className='bg-[#003580] py-2 px-2 text-white rounded-lg'
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>


      }
    </div>
  )
}

export default Card
