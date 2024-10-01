import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { addHotelAsync, addHotelileAsync, selectAddHotelRes } from './hotelProfileSlice';
import { fetchToken } from '../../../../../common/cookie';
import { useNavigate } from "react-router-dom"
const CreateHotelProfile = () => {

    const geoName = process.env.REACT_APP_GEO_NAMES_USERNAME
    console.log("geoName", geoName)
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const naviage = useNavigate()
    // selectors
    const hotelResponse = useSelector(selectAddHotelRes)
    const [keyPoints, setKeyPoints] = useState([{ point: "", index: 0 }])

    // location
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const selectedCountry = watch("country")
    const selectedState = watch("state")

    useEffect(() => {
        fetch("http://api.geonames.org/contains?geonameId=2746385&username=abhinavsen").then(response => response.json())
            .then(data => {
                console.log("data of country", data)
                setCountries(data.geonames)
            })
            .catch(error => console.error("Error fetching countries", error))
    }, [])

    // image upload state
    const [imageFile, setImageFile] = useState([])
    const [stateError, setStateError] = useState('')
    const [fileInput, setFileInput] = useState([])
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
        console.log("token", token)
        const response = await dispatch(addHotelAsync({ accessToken: token, hotelData: data }))
        if (response) {
            console.log("response in frontend", response)
            naviage("/room-profile", { state: response.payload.hotelId })
        }
    }

    const handleFileInput = (e) => {
        setImageFile([])
        console.log("file input", e.target.files)
        const files = Array.from(e.target.files)
        setFileInput(e.target.files)
        console.log()
        if ((imageFile.length + files.length) > 7) {
            console.log("(imageFile.length + files.length)", (imageFile.length + files.length))
            setStateError("You can only upload upto 7 files.")
            setImageFile([])
            return
        }

        const newImage = files.map(file => URL.createObjectURL(file))

        setImageFile((previous) => [...previous, ...newImage])
        setValue("images", files)
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
                                            <img className='object-cover  ' src={image} alt={`Uploaded ${index}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                        <div>
                            <div>
                                <label className='text-sm'>Hotel Name</label>
                                <input type="text" className='px-4 py-2 mt-3 w-full border rounded-lg text-sm'
                                    {...register("hotelName", { required: "This filed is required" })}
                                />
                                {errors.hotelName && <p className="text-red-500 my-0 py-0 text-sm ">{errors.hotelName.message}</p>}
                            </div>
                            <div className='mt-3'>
                                <label className='text-sm'>Hotel Description</label>
                                <textarea type="text" className='px-4 py-2 mt-3 w-full border rounded-lg text-sm'
                                    {...register("hotelDescription", { required: "This filed is required" })}
                                ></textarea>
                                {errors.hotelDescription && <p className="text-red-500 my-0 py-0 text-sm ">{errors.hotelDescription.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* right div */}
                <div className='w-full lg:w-1/2 px-6 my-8 border-l-2 '>
                    <div>
                        <p>Add key points about your hotel</p>
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

                        <div className='mt-3 flex w-full flex-wrap sm:flex-nowrap gap-2 my-4'>
                            
                            <div className='flex  w-full custom:w-1/3 flex-col'>
                                <label className='text-sm'>City</label>
                                <select className='px-4 w-full py-2 mt-2 border rounded-lg text-sm'
                                    {...register("city", { required: "This filed is required" })}
                                >
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                                {errors.city && <p className="text-red-500 my-0 py-0 text-sm ">{errors.city.message}</p>}
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className='flex flex-col sm:flex-row gap-3'>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Owner Contact</label>
                                    <input className='px-4 py-2 mt-2 border rounded-lg text-sm' type="text"
                                        {...register("ownerContact", { required: "This filed is required" })}
                                    />
                                    {errors.ownerContact && <p className="text-red-500 my-0 py-0 text-sm ">{errors.ownerContact.message}</p>}
                                </div>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Contact number for booking</label>
                                    <input className='px-4 py-2 mt-2 border rounded-lg text-sm' type="text"
                                        {...register("bookingContact", { required: "This filed is required" })}
                                    />
                                    {errors.bookingContact && <p className="text-red-500 my-0 py-0 text-sm ">{errors.bookingContact.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Number of Rooms</label>
                                    <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="tel"
                                        {...register("numberOfRooms", { required: "This filed is required" })}
                                    />
                                    {errors.numberOfRooms && <p className="text-red-500 my-0 py-0 text-sm ">{errors.numberOfRooms.message}</p>}
                                </div>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Additional Email</label>
                                    <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="email"
                                        {...register("email_1")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Address</label>
                                    <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="text"
                                        {...register("hotelAddress", { required: "This filed is required" })}
                                    />
                                    {errors.hotelAddress && <p className="text-red-500 my-0 py-0 text-sm ">{errors.hotelAddress.message}</p>}
                                </div>
                                <div className='flex flex-col w-full sm:w-1/2 mt-3'>
                                    <label className='text-sm'>Pincode</label>
                                    <input className='px-4  py-2 mt-2 border rounded-lg text-sm' type="number"
                                        {...register("pincode", { required: "This filed is required" })}
                                    />
                                    {errors.pincode && <p className="text-red-500 my-0 py-0 text-sm ">{errors.pincode.message}</p>}
                                </div>
                            </div>
                        </div>
                        <button className='bg-blue-600 inline-block cursor-pointer px-3 py-1 mt-3 text-sm text-white rounded-lg' type="submit">Submit</button>
                    </div>
                </div>
            </form>

        </div>

    )
}

export default CreateHotelProfile
