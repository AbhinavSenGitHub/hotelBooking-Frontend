import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomsAsync, selectAllRooms } from '../../DisplayRoom/DisplayRoomsSlice';
// slider imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allRooms = useSelector(selectAllRooms)
    console.log("all rooms", allRooms)

    useEffect(() => {
        dispatch(getAllRoomsAsync())
    }, [dispatch])

    const handleClick = (item) => {
        console.log("item, ", item)
        navigate("/description", { state: item })
    }

    // slider function

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (

        <div className='mt-14 px-12'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-medium'>
                    Explore Top Hotels with Exceptional Comfort and Service</h1>
                <p className=''>These top-rated hotels offer unmatched comfort, luxury, and convenience.</p>
                <p>Whether business or leisure, these hotels cater to every need.</p>
            </div>

            <div className=' my-10'>
                <Slider {...settings}>
                    {allRooms && allRooms.rooms && allRooms.rooms.map((item, index) => (
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

                </Slider>
            </div>


        </div>
    )
}

export default HotelCard