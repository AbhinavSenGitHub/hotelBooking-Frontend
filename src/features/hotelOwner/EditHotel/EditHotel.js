import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm, useFieldArray } from 'react-hook-form';
const EditHotel = () => {
    const location = useLocation().state
    console.log("location :-", location)
    const [imageWidth, setImageWidth] = useState(250); // Default width
    const firstImageRef = useRef(null);

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            hotelName: location.hotelName || '',
            hotelAddress: location.hotelAddress || '',
            city: location.city || '',
            bookingContact: location.bookingContact || '',
            numberOfRooms: location.numberOfRooms || '',
            ownerContact: location.ownerContact || '',
            pincode: location.pincode || '',
            hotelDescription: location.hotelDescription || '',
            keyPoints: location.keyPoints.map((kp) => kp.text || ''),
            images: location.images || [],
        },
    });

    const { fields: keyPointsFields } = useFieldArray({
        control,
        name: 'keyPoints',
    });

    const onSubmit = (data) => {
        console.log('Updated Hotel Data:', {
            ...data,
            keyPoints: data.keyPoints.map((text) => ({ text })),
        });
    };


    return (
        <div className='my-8 sm:px-16 px-6'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-3xl">Edit Hotel Details</h2>


                    <div className='flex flex-wrap gap-4 mt-8'>
                        {location.images &&
                            location.images.map((item, index) => (
                                <img
                                    key={index}
                                    src={item}
                                    alt={`Room ${index + 1}`}
                                    ref={index === 0 ? firstImageRef : null} // Attach ref to the first image
                                    className='h-[250px] rounded-lg shadow-md object-cover'
                                />
                            ))}
                        <label
                            className='h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-100 transition-all duration-300'
                            style={{ width: `${imageWidth}px` }} // Dynamically set width
                        >
                            <FontAwesomeIcon icon={faUpload} className='text-gray-600 text-3xl' />
                            <span className='mt-2 text-sm text-gray-600'>Click to upload</span>
                            <span className='mt-2 text-sm text-gray-600'>{location.images.length} / 10</span>
                            <input
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={(e) => {
                                    // Handle file upload here
                                    console.log(e.target.files[0]);
                                }}
                            />
                        </label>
                    </div>




                    {/* Fields */}
                    <div className="mt-16 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>Hotel Name</label>
                                <input
                                    type="text"
                                    {...register('hotelName')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>Hotel Address</label>
                                <input
                                    type="text"
                                    {...register('hotelAddress')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>City</label>
                                <input
                                    type="text"
                                    {...register('city')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>Booking Contact</label>
                                <input
                                    type="text"
                                    {...register('bookingContact')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>Owner Contact</label>
                                <input
                                    type="text"
                                    {...register('ownerContact')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    {...register('pincode')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-3 w-full md:w-1/3">
                                <label>Number of Rooms</label>
                                <input
                                    type="number"
                                    {...register('numberOfRooms')}
                                    className="border-2 px-2 py-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label>Hotel Description</label>
                            <textarea
                                {...register('hotelDescription')}
                                className="border-2 px-2 py-2 rounded-lg"
                                style={{ minHeight: '150px' }}
                            />
                        </div>

                        {/* Key Points */}
                        <div className="flex flex-wrap gap-4">
                            {location.keyPoints.map((field, index) => {
                                // Get the key dynamically (point1, point2, etc.)
                                const pointKey = Object.keys(field)[0];
                                return (
                                    <div key={index} className="flex flex-col gap-3 w-full md:w-1/2">
                                        <label>{`Key Point ${index + 1}`}</label>
                                        <input
                                            type="text"
                                            defaultValue={field[pointKey] || ''} // Initialize with the existing value
                                            {...register(`keyPoints.${index}.${pointKey}`)} // Correctly bind the keyPoints object
                                            className="border-2 px-2 py-2 rounded-lg"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            type="submit"
                            className="mt-6 rounded-lg bg-[#003580] text-white p-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditHotel
