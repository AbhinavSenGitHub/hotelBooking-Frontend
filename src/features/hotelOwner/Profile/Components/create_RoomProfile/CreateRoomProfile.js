import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser, faHome, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { fetchToken } from '../../../../../common/cookie';
import { useDispatch } from 'react-redux';
import { createRoomAsync } from './roomProfileSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateRoomProfile = () => {

    const { register, handleSubmit, watch, setValue, formState: { error } } = useForm()

    // use
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation().state
    console.log("location:- ", location)

    // useState
    const [keyPoints, setKeyPoints] = useState([{ point: "", index: 0 }])
    // image upload state
    const [imageFile, setImageFile] = useState([])
    const [stateError, setStateError] = useState('')
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    
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
      const handleAmenityChange = (event) => {
        setSelectedAmenities((previous) => previous.includes(event.target.value) ?  previous.filter(amenity => amenity !== event.target.value) :  [...previous, event.target.value]);
      };

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
        
        const token = await fetchToken()
        dispatch(createRoomAsync({ accessToken: token , roomData: data}))
        navigate("/display-rooms")
    }

    const handleFileInput = (e) => {
        setImageFile([])
        console.log("file input", e.target.files)
        const files = Array.from(e.target.files)
        if ((imageFile.length + files.length) > 7) {
            console.log("(imageFile.length + files.length)", (imageFile.length + files.length))
            setStateError("You can only upload upto 7 files.")
            setImageFile([])
            return
        }

        const newImage = files.map(file => URL.createObjectURL(file))

        setImageFile((previous) => [...previous, ...newImage])
        setValue("hotelImage", newImage)
        setStateError("")
    }

    // const handleDeletePoint = (index) => {
    //     console.log("index: " + index)
    //     if(keyPoints.length > 1){
    //         const newKeyPoints = keyPoints.filter((_, i) => i !== index)
    //         setKeyPoints(newKeyPoints)
    //         setValue('keyPoints', newKeyPoints);
    //     }
    // }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap lg:flex-nowrap'>
                {/* left div */}
                <div className='w-full lg:w-1/2 my-8 px-6'>
                    <div className='flex flex-col gap-8'>
                        <div className='p-10'>
                            <input className='' type="file" multiple onChange={handleFileInput} />
                            {stateError && <p style={{ color: 'red' }}>{stateError}</p>}
                            {imageFile.length > 0 && (
                                <Carousel>
                                    {imageFile.map((image, index) => (
                                        <div key={index}>
                                            <img className=' object-cover' src={image} alt={`Uploaded ${index}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                        <div>
                            <div className='my-4'>
                                <label className='text-sm'>Room Number</label>
                                <input type="text" className='px-4 py-2 mt-3 w-full border rounded-lg text-sm'
                                    {...register("roomNumber", { required: true })}
                                />
                            </div>
                            <div className='mt-3'>
                                <label className='text-sm'>Room Description</label>
                                <textarea type="text" className='px-4 py-2 mt-3 w-full border rounded-lg text-sm'
                                    {...register("roomDescription", { required: true })}
                                ></textarea>
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
                                        {/* <FontAwesomeIcon onClick={() => handleDeletePoint(index)} className='text-gray-600' icon={faTrash}/>  */}
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
                                <button className='bg-blue-600 inline-block cursor-pointer px-3 py-1 mt-3 text-sm text-white rounded-lg' type="button" onClick={handleAddPoint}>
                                    Add More
                                </button>
                            )}
                        </div>


                        <div className='w-full'>
                            <div className='flex flex-col sm:flex-row gap-3'>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Floor Number</label>
                                    <input className='px-4 py-2 mt-2 border rounded-lg text-sm' type="text"
                                        {...register("floorNumber", { required: true })}
                                    />
                                </div>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Number Of Bed</label>
                                    <input className='px-4 py-2 mt-2 border rounded-lg text-sm' type="text"
                                        {...register("numberOfBed", { required: true })}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='w-full'>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Capacity</label>
                                    <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="tel"
                                        {...register("capacity", { required: true })}
                                    />
                                </div>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Price /Day</label>
                                    <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="tel"
                                        {...register("price", { required: true })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className='flex mt-3  w-1/2 custom:w-1/3 flex-col'>
                                <label className='text-sm'>BathRoom</label>
                                <select className='px-4 w-full py-2 mt-2 border rounded-lg text-sm'
                                    {...register("bathRoom", { required: true })}
                                >
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                        </div>
                        <button className='bg-blue-600 inline-block cursor-pointer px-3 py-1 mt-3 text-sm text-white rounded-lg' type="submit">Submit</button>
                    </div>
                </div>
            </form>

        </div>

    )
}

export default CreateRoomProfile
