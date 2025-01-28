import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getRoomsbyHotelAsync, searchRoomByHotelIdAsync, selectRoomsByHotel, selectSearchedRooms } from './profileSlice'
import { fetchToken } from '../../../../../common/cookie'
import ProfileRoomCard from './ProfileRoomCard'
import { selectToken } from '../../../../auth/authSlice'
import { useForm } from 'react-hook-form'
import { deleteHotelAsync, selectStatus } from '../../../EditHotel/EditHotelSlice'
import { selectStatus as roomStatus } from '../../../RoomDescription/EditRoomSlice'
import DeleteModel from './DeleteModel'
import Loader from '../../../../../common/Loader'
const HotelRoom = () => {

  const location = useLocation().state
  const naviagte = useNavigate()
  const roomByHotel = useSelector(selectRoomsByHotel)
  const userToken = useSelector(selectToken)
  const searchResult = useSelector(selectSearchedRooms)
  const [allRooms, setAllRooms] = useState(true)

  // loding 
  const loader = useSelector(selectStatus)
  const roomLoader = useSelector(roomStatus)
  // model
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const [fieldId, setFieldId] = useState()
  // const [searchedRooms, setSelectedRooms] = useState(searchResult)
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()
  const dispatch = useDispatch()
  const handleClick = (id) => {
    naviagte("/room-profile", { state: id })
  }

  const getRoom = useCallback(() => {
    dispatch(getRoomsbyHotelAsync({ token: userToken, id: location._id }));
  }, [dispatch, userToken, location._id]);

  useEffect(() => {
    getRoom();
  }, [getRoom]);


  const onSubmit = (data) => {
    console.log("data", data, location._id)
    setAllRooms(false)
    dispatch(searchRoomByHotelIdAsync({ token: userToken, hotelId: location._id, data: data }))
  }

  const clearSearch = (e) => {
    e.preventDefault()
    setAllRooms(true)
    console.log("searchResult ", searchResult)
    reset()
  }

  const openModal = (objName, id) => {

    if (objName === 'hotel') {
      setIsModalOpen(true)
      setFieldName('hotel')
      setFieldId(id)
    } else {
      setIsModalOpen(true)
      setFieldName('room number')
      setFieldId(id)
    }

  }

  const closeModal = () => { setIsModalOpen(false) }
  return (
    <div className='px-10'>
      {loader === "pending" && (
        <Loader
        />
      )}
      {roomLoader === 'pending' && (
        <Loader />
      )}
      <div className=' border-b py-8 flex flex-col gap-3'>
        <h2 className='text-2xl'>{location.hotelName}</h2>
        <h2 className='text-lg text-gray-500'>{location.hotelAddress}, {location.city}, {location.pincode}</h2>
        <p>{location.hotelDescription}</p>
      </div>

      <DeleteModel isOpen={isModalOpen} onClose={closeModal} objName={'hotel'} id={fieldId} token={userToken} name={location.hotelName} />

      <div className='flex justify-between flex-wrap gap-3 my-8'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-wrap items-start">
          {/* Input Field */}
          <div className="flex flex-col">
            <input
              type="text"
              {...register("selectedValue", { required: "This field is required" })}
              className="border-2 rounded-lg w-[300px] px-2 py-3"
              placeholder="floor/room number"
            />
            {errors.field && (
              <p className="text-red-500 text-sm mt-1">
                {errors.field.message}
              </p>
            )}
          </div>


          {/* Dropdown with Error */}
          <div className="flex flex-col">
            <select
              className="border-2 px-4 py-3 rounded-lg"
              {...register("searchField", { required: "Please select a search field" })}
            >
              <option value="">Select a searching field</option>
              <option value="floorNumber">Floor number</option>
              <option value="roomNumber">Room number</option>
            </select>
            {errors.searchField && (
              <p className="text-red-500 text-sm mt-1">
                {errors.searchField.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="bg-[#003580] text-white px-4 py-3 rounded-lg transition duration-150 active:scale-95"
            type="submit"
          >
            Search
          </button>

          <button
            className="bg-[#e6ebf2] text-gray-500 px-4 py-3 rounded-lg transition duration-150 active:scale-95"
            onClick={clearSearch}
          >
            Clear Search
          </button>
          <div
            className="bg-[#ff2d57] text-white px-4 py-3 rounded-lg transition duration-150 active:scale-95 cursor-pointer"
            onClick={() => openModal('hotel', location._id)}
          >
            Delete Hotel
          </div>
        </form>
        <div>
          <button onClick={() => handleClick(location?._id)} className='hover:bg-[#003580] border-2 px-2 py-2 rounded-lg hover:text-white hover:border-none ease-in-out transition duration-150 active:scale-95'>
            Add new room
          </button>
        </div>
      </div>
      {allRooms && <div className='my-16 grid gap-6 px-4 custom-706:grid-cols-2 custom-1010:grid-cols-3 custom-1314:grid-cols-4'>
        {Array.isArray(roomByHotel) && roomByHotel.map((item, index) => (
          <ProfileRoomCard key={index} token={userToken} id={item._id} image={item.roomImages[0]} roomNumber={item.roomNumber} floorNumber={item.floorNumber} capacity={item.capacity} items={item} price={item.price} status={item.isBooked} />
        ))}
      </div>}
      {!allRooms && searchResult?.data.length > 0 && (
        <div className='my-16 grid gap-6 px-4 custom-706:grid-cols-2 custom-1010:grid-cols-3 custom-1314:grid-cols-4'>
          {Array.isArray(searchResult.data) && searchResult.data.map((item, index) => (
            <ProfileRoomCard key={index} token={userToken} id={item._id} image={item.roomImages[0]} roomNumber={item.roomNumber} floorNumber={item.floorNumber} capacity={item.capacity} items={item} price={item.price} status={item.isBooked} />
          ))}
        </div>
      )
      }

    </div>
  )
}

export default HotelRoom
