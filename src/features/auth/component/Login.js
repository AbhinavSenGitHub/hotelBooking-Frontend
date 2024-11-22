import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faSkype, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { loginUserAsync, selectStatus } from '../authSlice';
import Loader from "../../../common/Loader"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Slide from "@mui/material/Slide";
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const loader = useSelector(selectStatus)
    const [status, setStatus] = useState({ show: false, message: "", severity: "success" })
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)
        const response = await dispatch(loginUserAsync(data))
        if (response) {
            // console.log("loginResponse ", loginResponse)
            if (response?.payload?.success) {
                setStatus({ show: true, message: response?.payload?.message, severity: response?.payload?.severity })
                setTimeout(() => navigate("/"), 1000)
            }
            else{
                setStatus({ show: true, message: response?.payload?.message, severity: response?.payload?.severity })
            }
        }
    }
    return (
        <div>

         {/* Loader and Blur Background */}
         {loader === "panding" && (
               <Loader/>
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

            <div className="w-full mt-8 h-screen flex justify-center items-center px-4 sm:px-8 ">
                <div className='flex justify-center items-center flex-col gap-8'>
                    <div>
                        <h3 className='text-3xl'>Login </h3>
                    </div>
                    <div>
                        <form className='w-screen flex  justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-[500px] px-6 '>
                                <div className='flex flex-col mb-2'>
                                    <label className='text-sm text-gray-800'>Email</label>
                                    <input className="border text-sm px-4 py-2 my-2 rounded-md border-gray-300" type="email" placeholder='email'
                                        {...register("email", {
                                            required: "Email is required",
                                        })}
                                    />
                                    {errors.email && <p className="text-red-500 my-0 py-0 text-sm ">{errors.email.message}</p>}
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <label className='text-sm text-gray-800'>Password</label>
                                    <input className="border text-sm px-4 py-2 my-2 rounded-md border-gray-300" type="password" placeholder='Username'
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                    />
                                    {errors.password && <p className="text-red-500 my-0 py-0 text-sm ">{errors.password.message}</p>}
                                    <p className='mb-4 mt-1 text-sm cursor-pointer text-blue-700 flex justify-end py-0'>forgot password?</p>
                                </div>

                                <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 sm:text-base transform transition duration-150 active:scale-95' type="submit">Submit</button>

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
                                    <p className='text-sm'>Already have an account? <Link className='text-blue-700' to="/signup">Create new account?</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
