import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRoomsAsync, selectAllRooms } from '../DisplayRoomsSlice'
import SearchBar from '../../Home/component/SearchBar'
import { Link, useNavigate } from "react-router-dom"
const DisplayRooms = () => {
    const dispatch = useDispatch()
    const allRooms = useSelector(selectAllRooms)
    console.log("all rooms", allRooms)
    useEffect(() => {
        dispatch(getAllRoomsAsync())
    }, [dispatch])

    const navigate = useNavigate()
    const handleClick = (item) => {
        navigate("/description", { state: item})
    }
    return (
        <div>

            {/* top search portion */}
            <div className='flex items-center justify-center h-fit py-8 bg-[#003580]'>
                <SearchBar />
            </div>
            <div className='flex gap-6 flex-wrap justify-center mt-10 cursor-pointer'>
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
            </div>

        </div>
    )
}

export default DisplayRooms
