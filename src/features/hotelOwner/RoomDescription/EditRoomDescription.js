import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form';
import { editRoomAsync } from './EditRoomSlice';
import { selectToken } from '../../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const EditRoomDescription = () => {
    const location = useLocation().state
    const [previousImage, setPreviousImage] = useState(location.roomImages)
    const [newImage, setNewImageURL] = useState([])
    const [count, setCount] = useState(location?.roomImages?.length)
    const [deletedImages, setDeletedImages] = useState([])
    const [newFile, setNewFile] = useState([])
    console.log("edit room:", location)
    const [imageWidth, setImageWidth] = useState(250); // Default width
    const firstImageRef = useRef(null);

   const dispatch = useDispatch()
   const userToken = useSelector(selectToken)
    useEffect(() => {
        if (firstImageRef.current) {
            setImageWidth(firstImageRef.current.offsetWidth);
        }
    }, [location.roomImages]); // Recalculate if images change


    const { register, handleSubmit, control, setValue, getValues } = useForm({
        defaultValues: {
            roomNumber: location.roomNumber || '',
            floorNumber: location.floorNumber || '',
            capacity: location.capacity || '',
            numberOfBed: location.numberOfBed || '',
            bathroom: location.bathRoom ? 'Yes' : 'No',
            price: location.price || '',
            description: location.description || '',
            keyPoints: location.keyPoints,// Assuming keyPoints have a 'text' property
            roomImages: location.roomImages || [],
        },
    });

    const { fields: keyPointsFields } = useFieldArray({
        control,
        name: 'keyPoints', // Handle keyPoints array
    });


    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            bathRoom: data.bathroom === 'Yes',
            deletedImages: deletedImages,
            // keyPoints: data.keyPoints.map((text) => ({ text })), // Assuming keyPoints is an array of objects
        };
        console.log(formattedData);

        dispatch(editRoomAsync({accessToken: userToken, roomData: formattedData, roomId: location._id}))

    };

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
        setValue("roomImages", updateImage);
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
                    <h2 className='text-3xl'>Edit Room Details</h2>

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
                            ))
                        }

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

                        {count < 7 ? <label
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
                        </label> : <div></div>}
                    </div>

                    <div className='mt-16 flex flex-col gap-4'>
                        <div className='flex gap-6 flex-wrap'>
                            <div className='flex flex-col gap-3'>
                                <label>Room number</label>
                                <input
                                    type='number'
                                    {...register('roomNumber')}
                                    className='border-2 px-2 py-2 w-[250px] rounded-lg'
                                />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Floor number</label>
                                <input
                                    type='number'
                                    {...register('floorNumber')}
                                    className='border-2 px-2 py-2 w-[250px] rounded-lg'
                                />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Capacity</label>
                                <input
                                    type='number'
                                    {...register('capacity')}
                                    className='border-2 px-2 py-2 w-[250px] rounded-lg'
                                />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Number of Bed</label>
                                <input
                                    type='number'
                                    {...register('numberOfBed')}
                                    className='border-2 px-2 py-2 w-[250px] rounded-lg'
                                />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Bathroom</label>
                                <select
                                    {...register('bathroom')}
                                    className='border-2 px-2 py-2 w-[250px] rounded-lg'
                                >
                                    <option value='Yes'>Yes</option>
                                    <option value='No'>No</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Price</label>
                                <input
                                    type='number'
                                    {...register('price')}
                                    className='border-2 px-2 py-2 w-[250px] rounded-lg'
                                />
                            </div>
                        </div>

                        {/* <div>
                            {location.keyPoints.map((item, index) => (
                                <div>
                                    <label>Point {index+1}</label>
                                    <input {...register(`Point${index}`)}/>
                                </div>
                            ))}
                        </div> */}

                        <div className='flex flex-col gap-3'>
                            <label>Description</label>
                            <textarea
                                {...register('description')}
                                className='border-2 px-2 py-2 w-full rounded-lg'
                                style={{ minHeight: '200px' }}
                            />
                        </div>

                        {/* <div className='flex gap-4 flex-wrap'>
                            {keyPointsFields.map((field, index) => (
                                <div key={field.id} className='flex flex-col gap-3'>
                                    <label>{index + 1}. Key Points</label>
                                    <input
                                        type='text'
                                        {...register(`${index}`)}
                                        className='border-2 px-2 py-2 w-[450px] rounded-lg'
                                    />
                                </div>
                            ))}
                        </div> */}

                        <button
                            type='submit'
                            className='mt-6 rounded-lg bg-[#003580] text-white p-2 text-sm sm:text-base transform transition duration-150 active:scale-95 w-fit'
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditRoomDescription
