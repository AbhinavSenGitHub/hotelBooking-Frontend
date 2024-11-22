import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocationAsync, selectLocation } from '../../Profile/Components/create_HotelProfile/hotelProfileSlice'
const SearchBar = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log("data from the search ", data)
    }

    const dispatch = useDispatch()
    const location = useSelector(selectLocation)
    console.log("location", location)
    useEffect(() => {

        if (!location) {
            dispatch(getAllLocationAsync())
        }
    }, [dispatch])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='h-fit py-1 px-1 rounded-lg flex flex-wrap items-center justify-center gap-1 xl:bg-yellow-500 w-fit'>

                    <div className='bg-white py-2 border-2 border-yellow-300 xl:border-0 rounded-lg xl:rounded-none flex items-center  px-2 w-[300px]'>
                        <label><FontAwesomeIcon icon={faLocation} className='text-gray-600 text-2xl ' /></label>
                        <select type="text" {...register("city")} placeholder='Where you wish to go' className='py-2 px-4 ml-2 w-full ' >
                            <option>City / State</option>
                            {location && location.map((item, index) => (
                                <option className='py-2 px-2 border'>{item.name}, {item.state}</option>
                            ))}
                        </select>
                    </div>

                    <div className='bg-white py-2 border-2 border-yellow-300 xl:border-0 rounded-lg xl:rounded-none flex items-center  px-2 w-[350px]'>
                        <label>
                            Start
                        </label>
                        <input type="date" {...register("checkinDate")} placeholder='Check in data' className='py-2 px-4 ml-2 w-full' />
                    </div>

                    <div className='bg-white flex items-center  px-2 border-2 border-yellow-300 xl:border-0 rounded-lg xl:rounded-none w-[260px] py-2'>
                        <label className=''>
                            End
                        </label>
                        <input type="date" {...register("checkoutDate")} placeholder='Check out date' className='py-2  px-4 ml-2 w-full' />
                    </div>

                    <div>

                        <button type="submit" className='bg-[#2c7bea] font-normal text-2xl   rounded-lg xl:rounded-none lg:w-full py-3 px-4 text-white'>Search</button>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBar