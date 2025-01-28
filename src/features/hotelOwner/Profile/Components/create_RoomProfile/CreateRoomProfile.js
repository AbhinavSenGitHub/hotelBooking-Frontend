import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser, faHome, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { fetchToken } from '../../../../../common/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomAsync, selectRoomStatus } from './roomProfileSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Slide, Stack } from '@mui/material';

import Loader from '../../../../../common/Loader';
import { selectToken } from '../../../../auth/authSlice';

const CreateRoomProfile = () => {

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()

    // use
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation().state
    const loader = useSelector(selectRoomStatus)
    const userToken = useSelector(selectToken)
    console.log("location:- ", location)

    // useState
    const [keyPoints, setKeyPoints] = useState([{ point: "", index: 0 }])
    const [status, setStatus] = useState({ show: false, message: "", severity: "success" })
    // image upload state
    const [imageFile, setImageFile] = useState([])
    const [stateError, setStateError] = useState('')
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [fileInput, setFileInput] = useState([])

    setValue("roomHotel_Id", location)

    const predefinedAmenities = [
        "WiFi",
        "Air Conditioning",
        "TV",
        "Pool",
        "Gym",
        "Parking",
        "Breakfast"
    ];

    const handleAddPoint = () => {
        const newPointNumber = keyPoints.length + 1
        if (newPointNumber <= 5) {
            setKeyPoints([...keyPoints, { [`point${newPointNumber}`]: '' }])
        }
    }

    const handleInputChange = (index, event) => {
        const newKeyPoints = [...keyPoints]
        const pointKey = `point${index + 1}`
        newKeyPoints[index] = { [pointKey]: event.target.value }
        setKeyPoints(newKeyPoints)
        setValue('keyPoints', newKeyPoints);
    }

    const onSubmit = async (data) => {
        console.log("data", data)
        const response  = await dispatch(createRoomAsync({ accessToken: userToken, roomData: data }))
        console.log("response of room", response)
        if(response.payload?.success){
            setStatus({ show: true, message: response.payload?.message, severity: response?.payload?.severity })
            setTimeout(() => navigate("/owner-profile"), 1000)
        
        }else{
            setStatus({ show: true, message: response.payload?.message, severity: response?.payload?.severity })
        }

    }

    const handleFileInput = (e) => {
        console.log("file input", e.target.files)
        const files = Array.from(e.target.files)
        setFileInput(e.target.files)
        if ((imageFile.length + files.length) > 7) {
            console.log("(imageFile.length + files.length)", (imageFile.length + files.length))
            setStateError("You can only upload upto 7 files.")
            return
        }
        const newImage = files.map(file => URL.createObjectURL(file))
        setImageFile((previous) => [...previous, ...newImage])
        setValue("roomImage", files)
        setStateError("")
    }

    const handleDeleteImage = (index) => {
        console.log("delete: " + index);

        // Remove image URL from imageFile
        const updatedImages = imageFile.filter((_, i) => i !== index);
        console.log("delete: " + updatedImages)
        setImageFile(updatedImages);

        // Remove corresponding file from fileInput
        const updatedFiles = Array.from(fileInput).filter((_, i) => i !== index);
        setFileInput(updatedFiles);

        // Update form value
        setValue("roomImage", updatedFiles);

        // Clear error if needed
        setStateError("");
    };

    return (
        <div className='relative'>
        
            {/* Loader and Blur Background */}
            {loader === "pending" && (
                <Loader />
            )}

            {/* status */}
            {status.show && (
                <Slide direction="left" in={status.show} mountOnEnter unmountOnExit>
                    <Stack sx={{ width: "300px", position: "fixed", top: 30, right: 0, zIndex: 1000 }} spacing={2}>
                        <Alert severity={status.severity} variant="outlined">
                            {status.message}
                        </Alert>
                    </Stack>
                </Slide>
            )}

            <div>
                <div className='w-full py-6 border-b-2'>
                    <h2 className='flex justify-start px-6  mt-8 text-2xl'>Add your Hotel room details here</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap lg:flex-nowrap'>
                    {/* left div */}
                    <div className='w-full lg:w-1/2 my-8 px-6'>
                        <div className='flex flex-col gap-8'>

                        {/* image */}
                            <div className='md:p-10'>

                                <div className="w-full h-70 mb-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
                                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                        <input
                                            className="hidden"
                                            type="file"
                                            multiple
                                            onChange={handleFileInput}
                                        />
                                        <div className="text-center my-4">

                                            <p className="text-gray-600 font-medium">Upload Room Image</p>
                                            <p className="text-xs text-gray-500">(JPEG, PNG, or JPG)</p>
                                        </div>
                                    </label>
                                </div>

                                {stateError && <p style={{ color: 'red' }}>{stateError}</p>}

                                {imageFile.length > 0 && (
                                    <Carousel showThumbs={true}>
                                        {imageFile.map((image, index) => (
                                            <div key={index} className="w-full relative h-80 overflow-hidden group">
                                                <img
                                                    className="object-contain w-full h-full"
                                                    src={image}
                                                    alt={`Uploaded ${index}`}
                                                />
                                                {/* Delete Icon */}
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the click on image
                                                        handleDeleteImage(index); // Delete the image
                                                    }}
                                                    className="absolute top-2 left-8 bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                            </div>

                            <div>
                                <div className='my-4'>
                                    <label className='text-sm'>Room Number</label>
                                    <input type="text" className='px-4 py-2 mt-3 w-full border rounded-lg text-sm'
                                        {...register("roomNumber", { required: "This filed is required" })}
                                    />
                                    {errors.roomNumber && <p className="text-red-500 my-1 py-0 text-sm ">{errors.roomNumber.message}</p>}
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm'>Room Description</label>
                                    <textarea type="text" className='px-4 py-2 mt-3 w-full border rounded-lg text-sm'
                                        {...register("description", { required: "This filed is required" })}
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 my-1 py-0 text-sm ">{errors.description.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right div */}
                    <div className='w-full lg:w-1/2 px-6 my-8 border-l-2 '>
                        <div>
                            <p>Add key points about your room</p>
                            <div className='mt-3'>
                                {keyPoints.map((keyPoint, index) => (
                                    <div key={index}>
                                        <div className='flex justify-between pr-1 pt-4'>
                                            <label className='text-sm'>Point {index + 1}:</label>
                                        </div>
                                        <input
                                            className='px-4 py-2 mt-2 w-full border rounded-lg text-sm'
                                            type="text"
                                            value={keyPoint[`point${index + 1}`]}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </div>
                                ))}
                                {/* Show "Add More" button only if there are less than 5 points */}
                                {keyPoints.length < 5 && (
                                    <div className=' inline-block cursor-pointer px-3 py-1 my-3 text-white rounded-lg bg-[#003580] text-sm sm:text-base transform transition duration-150 active:scale-95' type="button" onClick={handleAddPoint}>
                                        Add More
                                    </div>
                                )}
                            </div>


                            <div className='w-full'>
                                <div className='flex flex-col sm:flex-row gap-3'>
                                    <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                        <label className='text-sm'>Floor Number</label>
                                        <input className='px-4 py-2 mt-2 border rounded-lg text-sm' type="text"
                                            {...register("floorNumber", { required: "This filed is required" })}
                                        />
                                        {errors.floorNumber && <p className="text-red-500 my-1 py-0 text-sm ">{errors.floorNumber.message}</p>}
                                    </div>
                                    <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                        <label className='text-sm'>Number Of Bed</label>
                                        <input className='px-4 py-2 mt-2 border rounded-lg text-sm' type="text"
                                            {...register("numberOfBed", { required: "This filed is required" })}
                                        />
                                        {errors.numberOfBed && <p className="text-red-500 my-1 py-0 text-sm ">{errors.numberOfBed.message}</p>}
                                    </div>
                                </div>
                            </div>


                            <div className='w-full'>
                                <div className='flex flex-col sm:flex-row gap-4'>
                                    <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                        <label className='text-sm'>Capacity</label>
                                        <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="tel"
                                            {...register("capacity", { required: "This filed is required" })}
                                        />
                                        {errors.capacity && <p className="text-red-500 my-1 py-0 text-sm ">{errors.capacity.message}</p>}
                                    </div>
                                    <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                        <label className='text-sm'>Price / Day</label>
                                        <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="tel"
                                            {...register("price", { required: "This filed is required" })}
                                        />
                                        {errors.price && <p className="text-red-500 my-1 py-0 text-sm ">{errors.price.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='flex mt-3  w-1/2 custom:w-1/3 flex-col'>
                                    <label className='text-sm'>BathRoom</label>
                                    <select className='px-4 w-full py-2 mt-2 border rounded-lg text-sm'
                                        {...register("bathRoom", { required: "This filed is required" })}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>
                            </div>
                            <button className='inline-block cursor-pointer px-3 py-1 my-3 text-white rounded-lg bg-[#003580] text-sm sm:text-base transform transition duration-150 active:scale-95' type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateRoomProfile
