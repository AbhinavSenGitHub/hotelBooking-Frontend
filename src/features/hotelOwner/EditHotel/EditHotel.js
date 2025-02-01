import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../auth/authSlice';
import { editHotelAsync } from './EditHotelSlice';
const EditHotel = () => {
    const location = useLocation().state
    console.log("location :-", location)
    const [imageWidth, setImageWidth] = useState(250); // Default width
    const firstImageRef = useRef(null);
    const [newImage, setNewImageURL] = useState([])
    const [newFile, setNewFile] = useState([])
    const [count, setCount] = useState(location?.images?.length)
    const [deletedImages, setDeletedImages] = useState([])
    const navigate = useNavigate()
    const [previousImage, setPreviousImage] = useState(location.images)
       const userToken = useSelector(selectToken)
    const dispatch = useDispatch()
    const { register, handleSubmit, control, setValue } = useForm({
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

    const onSubmit = async (data) => {

        const formattedData = {
            ...data,
            deletedImages: deletedImages,
        }
        console.log(formattedData);
        const response = await dispatch(editHotelAsync({accessToken: userToken, hotelData: formattedData, hotelId: location._id}))
        if(response){
            navigate('/owner-profile')
        }
    };


    // edit image 
    const handleImageInput = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files)
        console.log("files: ", files)
        const newImages = files.map(file => URL.createObjectURL(file))
        console.log("newImages: ", newImages)
        setNewImageURL((previous) => [...previous, ...newImages ])
        setNewFile((previous) => {
            const updateImageArray = [...previous, ...files]

            setValue("newImages", updateImageArray)
            return updateImageArray
        })
        setCount(count + 1)
    }

    const handleDeleteImage = (index, item) => {
        const updateImage = previousImage.filter((_, i) => i !== index)
        setValue("images", updateImage);
        setCount(count - 1);
        setDeletedImages((previous) => [...previous, item])
        console.log("deleted images", deletedImages)
        setPreviousImage(updateImage)
    }

    const handleDeleteNewImage = (index) => {
        const updateImage = newImage.filter((_, i) => i !== index)
        const newFilesImage = newFile.filter((_, i) => i !== index)
        console.log("deleted 1", newFilesImage)
        setNewFile(newFilesImage)
        setNewImageURL(updateImage)
        setValue("newImages", newFilesImage)
        setCount(count-1)
    }

    return (
        <div className='my-8 sm:px-16 px-6'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-3xl">Edit Hotel Details</h2>

                    <div className='flex flex-wrap gap-4 mt-8'>
                        {previousImage &&
                            previousImage.map((item, index) => (
                                <div className='relative'>
                                <img
                                    key={index}
                                    src={item}
                                    alt={`Room ${index + 1}`}
                                    ref={index === 0 ? firstImageRef : null} // Attach ref to the first image
                                    className='h-[250px] rounded-lg shadow-md object-cover'
                                />
                                 <button onClick={() => handleDeleteImage(index, item)}
                                        className="absolute top-2 right-2 bg-white text-black font-extrabold rounded-full p-1 px-2 hover:bg-white focus:outline-none shadow-md">
                                        ✕
                                    </button>
                                    </div>
                            ))}

                            {newImage.length > 0 && newImage.map((item, index) => (
                            <div className='relative'>
                                <img
                                    key={index}
                                    src={item}
                                    alt={`Uploaded ${index}`}
                                    className='h-[250px] rounded-lg shadow-md object-cover'
                                />
                                <button onClick={() => handleDeleteNewImage(index, item)}
                                    className="absolute top-2 right-2 bg-white text-black font-extrabold rounded-full p-1 px-2 hover:bg-white focus:outline-none shadow-md">
                                    ✕
                                </button>
                            </div>
                        ))
                        }


                        <label
                            className='h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-100 transition-all duration-300'
                            style={{ width: `${imageWidth}px` }} // Dynamically set width
                        >
                            <FontAwesomeIcon icon={faUpload} className='text-gray-600 text-3xl' />
                            <span className='mt-2 text-sm text-gray-600'>Click to upload</span>
                            <span className='mt-2 text-sm text-gray-600'>{count} / 7</span>
                            <input
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={handleImageInput}
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
