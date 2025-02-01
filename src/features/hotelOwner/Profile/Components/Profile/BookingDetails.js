import { faArrowLeft, faCab, faDog, faParking, faTv, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ImageModal from '../../../RoomDescription/ImageModal'

const BookingDetails = () => {

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = () => {
        setIsModalOpen(true); // Open the modal on image click
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };
    const length = 8
    const location = useLocation().state
    console.log("booking details", location)
    return (
        <div className='mt-12 px-4 mb-20'>

            <div className='mb-10 pb-6  border-b  flex gap-4'>
                <div className='pt-1'>
                    <Link to="/owner-profile" >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>
                <div className=''>
                    <h1 className='text-2xl font-medium'>{location.hotelDetails.hotelName}</h1>
                    <p className='text-lg text-gray-600'>{location.hotelDetails.hotelAddress} {location.hotelDetails.city}, {location.hotelDetails.pincode}</p>
                </div>
            </div>

            <div className='flex flex-wrap justify-between'>
                {/* left section */}
                <div className='w-full size1:w-2/3 '>
                    <div className='flex flex-col mdd:flex-row gap-1'>
                        {/* image */}
                        <div className='flex flex-col smm:flex-row mdd:flex-col gap-1'>
                            <div className='w-full smm:w-auto'>
                                <img className='h-[225px] object-cover rounded-lg w-full' src={location.roomDetails.roomImages[0]} />
                            </div>
                            <div className='w-full smm:w-auto'>
                                <img className='h-[225px] object-cover mb-3 rounded-lg w-full' src={location.roomDetails.roomImages[1]} />
                            </div>
                        </div>

                        <div className='flex flex-col smm:flex-row mdd:flex-col gap-1'>
                            <div>
                                <img src={location.roomDetails.roomImages[2]} className='h-[290px] object-cover rounded-lg' />
                            </div>

                            <div className='flex gap-1 flex-wrap '>

                                <div className='w-full mdd:w-auto'>
                                    <img src={location.roomDetails.roomImages[2]} className='h-[225px] smm:h-[145px] mdd:h-[160px] w-full object-cover rounded-lg' />
                                </div>



                                <div className='relative lg:h-[160px] h-[250px]'>
                                    <img className='h-full w-full rounded-lg' src={location.roomDetails.roomImages[2]} onClick={handleImageClick} />
                                    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg' onClick={handleImageClick}>
                                        <span className='text-white text-lg font-semibold cursor-pointer' onClick={handleImageClick}>{length - 1}+ images</span>
                                    </div>
                                </div>
                            </div>

                            <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} hotelImage={location.hotelDetails.images} roomImage={location.roomDetails
.roomImages}>
                            </ImageModal>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className='flex gap-3 flex-wrap'>
                        <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                            <FontAwesomeIcon className='text-xl' icon={faWifi} /> <h2 className='text-xl'>Wifi</h2>
                        </div>
                        <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                            <FontAwesomeIcon className='text-xl' icon={faTv} /> <h2 className='text-xl'>Flat Screen T.V.</h2>
                        </div>
                        <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                            <FontAwesomeIcon className='text-xl' icon={faCab} /> <h2 className='text-xl'>Cab</h2>
                        </div>
                        <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                            <FontAwesomeIcon className='text-xl' icon={faParking} /> <h2 className='text-xl'>Parking</h2>
                        </div>
                        <div className='border shadow-md text-blue-600 my-3 flex justify-center items-center gap-3 rounded-lg py-3 px-6 w-fit'>
                            <FontAwesomeIcon className='text-xl' icon={faDog} /> <h2 className='text-xl'>Pet Allowed</h2>
                        </div>
                    </div>

                    <div className='pr-4'>
                        <div className=''>
                            <h2 className='text-xl font-medium my-3'>Room Description</h2>
                            <p>{location.roomDetails.description}</p>
                        </div>
                        <div>
                            <h2 className='text-xl font-medium my-3' >Hotel Description</h2>
                            <p>{location.hotelDetails.
                                hotelDescription}</p>
                        </div>
                    </div>
                </div>
                {/* right section */}
                <div className='w-[400px] flex flex-col gap-6'>
                    <div className="border rounded-xl shadow-md bg-[#fbfbfb]">
                        <div className='bg-[#003580] px-4 pt-4 border rounded-t-xl text-white w-fll'>
                            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                        </div>
                        <ul className="space-y-2 px-4 py-4">
                            {location &&
                                <ul>
                                    <li className="text-gray-700">Person Name: {location.bookingName}</li>
                                    <li className="text-gray-700">Email used: {location.bookingEmail}</li>
                                    <li className="text-gray-700">Contact used: {location.bookingContact}</li>
                                    <li className="text-gray-700">Check-In Date: {formatDate(location.checkinDate)}</li>
                                    <li className="text-gray-700">Check-out Date: {formatDate(location.checkoutDate)}</li>
                                </ul>
                            }
                        </ul>
                    </div>

                    <div className="border rounded-xl shadow-md bg-[#fbfbfb]">
                        <div className='bg-[#003580] px-4 pt-4 border rounded-t-xl text-white w-full'>
                            <h2 className="text-xl font-semibold  mb-4">About Room</h2>
                        </div>
                        <ul className="space-y-2 px-4 py-4 ">
                            {location &&
                                location.roomDetails.keyPoints.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li className="text-gray-700">{item.point1}</li>
                                        <li className="text-gray-700">{item.point2}</li>
                                        <li className="text-gray-700">{item.point3}</li>
                                        <li className="text-gray-700">{item.point4}</li>
                                        <li className="text-gray-700">{item.point5}</li>
                                    </React.Fragment>
                                ))}
                        </ul>
                    </div>

                    <div className="shadow-md bg-[#fbfbfb] mt-6">
                        <div className='bg-[#003580] px-4 pt-4 border rounded-t-xl text-white w-full'>
                            <h2 className="text-xl font-semibold mb-4">About Hotel</h2>
                        </div>
                        <ul className="space-y-2 px-4 py-4">
                            {location &&
                                location.hotelDetails.keyPoints.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li className="text-gray-700">{item.point1}</li>
                                        <li className="text-gray-700">{item.point2}</li>
                                        <li className="text-gray-700">{item.point3}</li>
                                        <li className="text-gray-700">{item.point4}</li>
                                        <li className="text-gray-700">{item.point5}</li>
                                    </React.Fragment>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetails
