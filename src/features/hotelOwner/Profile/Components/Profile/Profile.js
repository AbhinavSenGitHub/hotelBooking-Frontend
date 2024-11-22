import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Card from '../../../DisplayRoom/components/Card'
import { fetchAuthCookie, fetchToken } from '../../../../../common/cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerHotelsAsync, selectOwnerHotel } from './profileSlice'
import ProfileCard from './ProfileCard'
import { Link } from 'react-router-dom'
import { selectCookie, selectToken } from '../../../../../common/fetchCookieData'
import gift from "./ProfileImages/gift.png"
const Profile = () => {

    const dispatch = useDispatch()
    const ownerHotels = useSelector(selectOwnerHotel)
    const userToken = useSelector(selectToken)
    const userCookie = useSelector(selectCookie)
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("userToken", userToken)

    useEffect(() => {
        console.log("getCookie in the profile: ", userToken)
        if (userToken) {

            dispatch(getOwnerHotelsAsync({ token: userToken }))
        }

    }, [dispatch, userToken])

    useEffect(() => {
        if (Array.isArray(ownerHotels) && ownerHotels.length > 0) {
            console.log("length",ownerHotels.length)
            setIsModalOpen(true)
        } else {
            setIsModalOpen(false)
        }
    }, [ownerHotels])


    
    const closeModal = () => {
        setIsModalOpen(true); // Function to close modal
    };

    return (
        <div>
            <div className='flex  justfiy-center flex-col w-full mt-8'>
                {/* top */}
                <div className='mx-4 p-4 border-b-2 flex flex-wrap gap-6 justify-between items-end'>
                    <div className='flex gap-4'>
                        <div className='h-20 w-20 rounded-full bg-blue-200 flex justify-center items-center'>
                            <p className='text-5xl text-gray-600 pb-2'>{userCookie && userCookie.username && userCookie.username[0]}</p>
                        </div>

                        {userCookie &&
                            <div className='pl-8 border-l-2 border-gray-400'>
                                <p>Username: {userCookie.username}</p>
                                <p>UserType: {userCookie.userType}</p>
                                <p>Email: {userCookie.email}</p>
                            </div>}
                    </div>

                    <div className="flex items-center border-2 rounded-lg bg-white p-2 mr-4">
                        {" "}
                        {/* Search bar appears */}
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 border rounded-lg border-gray-50 py-1 w-full outline-none"
                        />
                        {/* <button className="border rounded-lg px-3 py-1 mx-1 hover:bg-blue-700 transition duration-300 ease-in-out hover:text-white">
                            Search
                        </button> */}
                        <FontAwesomeIcon
                            //   onClick={handleSearchToggle} // Close the search bar
                            icon={faSearch} // Cross icon to close
                            className="text-lg mx-1 text-gray-500 cursor-pointer"
                        />
                    </div>
                </div>

                {/* bottom */}

                <div className='mt-8 px-10 '>
                    <div className='flex flex-wrap gap-3 justify-between'>
                        <h2 className='text-3xl'>Hotels you have listed till  now on the website</h2>
                        <button className="border p-2 rounded-lg bg-[#003580] text-white  text-sm sm:text-base transform transition duration-150 active:scale-95">
                            <Link to="/hotel-profile">
                                Add New Hotel
                            </Link>
                        </button>

                    </div>

                    {(Array.isArray(ownerHotels) && ownerHotels.length > 0) ?
                        <div className="my-16 grid gap-6 px-4 custom-706:grid-cols-2 custom-1010:grid-cols-3 custom-1314:grid-cols-4">

                            {ownerHotels.map((item, index) => (

                                <ProfileCard image={item.images[0]} address={item.hotelAddress}
                                    hotelName={item.hotelName}
                                    numberOfRoom={item.numberOfRooms}
                                    items={item}
                                />
                            ))}

                        </div> : (

                            !isModalOpen ? (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white mx-3 rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col justify-center">

                                        <img className='h-[280px]' src={gift} />
                                        <h2 className="text-xl mt-2 font-bold mb-4">Create Your First Hotel! 🎉</h2>
                                        <p className="mb-6">
                                            Get a reward on your first hotel
                                        </p>

                                        <div className='flex  gap-2'>
                                            <button
                                                // onClick={closeModal}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600  transform transition duration-150 active:scale-95"
                                            >
                                                <Link to="/hotel-profile">

                                                    Add My Hotel
                                                </Link>
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="px-4 py-2 bg-gray-200 border-gray-200 border-2 text-black rounded hover:bg-gray-300 transform transition duration-150 active:scale-95"
                                            >
                                                Skip for now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : <div className='w-full mt-8 rounded-xl h-[400px] flex flex-col justify-center items-center gap-10  bg-gray-100'>

                                <h2 className='text-3xl '>Start Your Hosting Journey with Us, by clicking on "Add New Hotel" button🎉</h2>
                                <p className='test-gray-400 w-3/4 text-gray-500'>
                                    Welcome! We're excited to have you join our platform. By listing your first hotel, you're not just opening doors to new guests, but also unlocking a world of rewards 🤩. With our unique blockchain-based reward system, every booking you make brings you closer to exclusive Web 3 benefits. It's time to turn your passion for hospitality into a rewarding experience—host your first hotel today and let the rewards roll in!
                                </p>
                            </div>)}
                </div>

            </div>


        </div>
    )
}

export default Profile


{/* <div className='w-full mt-8 rounded-xl h-[400px] flex flex-col justify-center items-center gap-10  bg-gray-100'>

                            <h2 className='text-3xl '>Start Your Hosting Journey with Us, by clicking on "Add New Hotel" button🎉</h2>
                            <p className='test-gray-400 w-3/4 text-gray-500'>
                                Welcome! We're excited to have you join our platform. By listing your first hotel, you're not just opening doors to new guests, but also unlocking a world of rewards 🤩. With our unique blockchain-based reward system, every booking you make brings you closer to exclusive Web 3 benefits. It's time to turn your passion for hospitality into a rewarding experience—host your first hotel today and let the rewards roll in!
                            </p>
                        </div> */}