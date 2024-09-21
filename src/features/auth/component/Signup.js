import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faSkype, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createUserAsync, selectUserResponse } from '../authSlice';
const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    // const signupResponse = useSelector(selectUserResponse)
    const navigate = useNavigate();
   
    const onSubmit = async (data) => {
        console.log(data)
        const response = await dispatch(createUserAsync(data))
        if(response){
            // console.log("singupResponse", signupResponse)
            console.log("singupResponse response", response)
            if (response?.payload?.success) {
                navigate("/hotel-profile");
            }
        }
    }
    return (
        <div className="w-full  mt-8">
            <div className='flex justify-center items-center flex-col gap-8'>
                <div>
                    <h3 className='text-3xl'>Hotel Booking</h3>
                </div>
                <div>
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className='w-full flex  justify-center items-center'>
                        <div className='w-[500px] px-6'>
                            <div className='flex flex-col mb-1'>
                                <label className='text-sm text-gray-800'>Username</label>
                                <input className="border text-sm px-4 py-2 my-2 rounded-md border-gray-300" type="text" placeholder='Username'
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />
                                {errors.username && <p className="text-red-500 my-0 py-0 text-sm ">{errors.username.message}</p>}
                            </div>
                            <div className='flex flex-col mb-1'>
                                <label className='text-sm text-gray-800'>Email</label>
                                <input className="border text-sm px-4 py-2 my-2 rounded-md border-gray-300"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                            message: "Email is not valied"
                                        }
                                    })}
                                    type="email" placeholder='Username'
                                />
                                {errors.email && <p className="text-red-500 text-sm whitespace-pre-line">{errors.email.message}</p>}
                            </div>
                            <div className='flex flex-col mb-1'>
                                <label className='text-sm text-gray-800'>Password</label>
                                <input className="border text-sm px-4 py-2 my-2 rounded-md border-gray-300" type="password" placeholder='Username'
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `- at least 8 characters
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
- Can contain special characters`
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-red-500 text-sm whitespace-pre-line">{errors.password.message}</p>}
                            </div>

                            <div className='flex flex-col mb-1'>
                                <label className='text-sm text-gray-800'>User Type</label>
                                <select className="border text-sm cursor-pointer px-4 py-2 my-2 rounded-md border-gray-300" type="password" placeholder='Username'
                                    {...register("userType", {
                                        required: "This field is required"
                                    })}
                                >
                                    <option value="">Select....</option>
                                    <option value="hotelOwner">Want to host my hotel.</option>
                                    <option value="customer">Make a booking.</option>
                                </select>
                                {errors.userType && <p className="text-red-500 text-sm whitespace-pre-line">{errors.userType.message}</p>}
                            </div>

                            <button className='border w-full py-2 font-medium text-sm rounded-md hover:text-white hover:bg-[#2b77f9] transition duration-300' type="submit">Submit</button>

                            <div className='flex items-center my-8'>
                                <hr className='flex-grow border-gray-300' />
                                <span class="px-4 text-sm text-gray-500">OR</span>
                                <hr className='flex-grow  border-gray-300' />
                            </div>

                            <div className='flex gap-6 items-center justify-center'>
                                <div className='py-2 border px-3 cursor-pointer rounded-full '>
                                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                                </div>
                                <div className='py-2 border px-3 cursor-pointer rounded-full '>
                                    <FontAwesomeIcon icon={faGoogle} size="lg" className='text-[#DB4437]' />
                                </div>
                                <div className='py-2 border px-3 cursor-pointer rounded-full '>
                                    <FontAwesomeIcon icon={faSkype} size="lg" className='text-[#00AFF0]' />
                                </div>
                            </div>
                            <div className='text-center my-4'>
                                <p className='text-sm'>Already have an account? <Link className='text-blue-700' to="/login">Try Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
