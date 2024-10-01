import React from 'react'
import { Link } from "react-router-dom"
const HotelCard = () => {
    return (
        <div className='border rounded-xl w-fit mb-10'>
            <div className='w-[40vh] h-[200px] rounded-xl bg-gray-500'>
                <img className='object-cover h-[200px] w-full rounded-t-xl' src="https://cf.bstatic.com/xdata/images/hotel/square240/81234477.jpg?k=3dec0a705d2a0c11096f00f86a16f6fd0109b034e2dfab904ed3af224b82214b&o=" />
            </div>
            
            <div className='px-3 py-2 flex flex-col gap-2'>
                <div>
                    <h3 className='text-black font-medium text-lg'>Hotel Name....</h3>
                    <h3 className='text-xs text-gray-700'>Complete Hotel Addresss.... will come here</h3>
                </div>

                <p>⭐⭐⭐⭐</p>
                <div className='flex justify-between'>
                <p className='flex items-center'>₹1249/per night</p>
                <Link className='bg-[#003580] py-2 px-2 text-white rounded-lg' to="/display">Book Now</Link>
                </div>
            </div>

        </div>
    )
}

export default HotelCard
