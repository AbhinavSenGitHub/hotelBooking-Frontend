import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faSkype, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createUserAsync, googleAuthAsync, selectStatus, selectUserResponse } from '../authSlice';
import Loader from "../../../common/Loader"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Slide from "@mui/material/Slide";
const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const loader = useSelector(selectStatus)
    const [userType, setUserType] = useState('')
    const [status, setStatus] = useState({ show: false, message: "", severity: "success" })
    // const signupResponse = useSelector(selectUserResponse)
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        const response = await dispatch(createUserAsync(data))
        if (loader) {
            console.log("loader response", loader)
            setStatus({ show: true, message: response?.payload?.message, severity: response?.payload?.severity })
            if (loader === 'idle') {
                navigate("/email-verify", { state: data.email })
            }
        }

    }

    const handleGoogleAuth = () => {
        if (userType) {

            dispatch(googleAuthAsync({ userType }))
        } else {
            setStatus({ show: true, message: "Select User Type first ", severity: "info" })
        }
    }
    return (
        <div>

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
            <div className="w-full h-screen flex justify-center items-center px-4 sm:px-8">
                <div className="flex flex-col items-center w-full max-w-lg gap-8">
                    <div className="w-full">
                        <h3 className="text-2xl md:text-3xl text-center">Sign Up</h3>
                        <form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full mt-6"
                        >
                            <div className="flex flex-col gap-4">
                                {/* Username */}
                                <div>
                                    <label className="text-sm text-gray-800">Username</label>
                                    <input
                                        className="w-full border text-sm px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        placeholder="Username"
                                        {...register("username", {
                                            required: "Username is required",
                                        })}
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm text-gray-800">Email</label>
                                    <input
                                        className="w-full border text-sm px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                message: "Email is not valid",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="text-sm text-gray-800">Password</label>
                                    <input
                                        className="w-full border text-sm px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value:
                                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                message: `- At least 8 characters
- Must contain 1 uppercase, 1 lowercase, and 1 number
- Special characters allowed`,
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* User Type */}
                                <div>
                                    <label className="text-sm text-gray-800">User Type</label>
                                    <select
                                        className="w-full border text-sm px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("userType", {
                                            required: "User type is required",
                                        })}
                                        onChange={(e) => setUserType(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="hotelOwner">Want to host my hotel</option>
                                        <option value="customer">Make a booking</option>
                                    </select>
                                    {errors.userType && (
                                        <p className="text-red-500 text-sm">{errors.userType.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 sm:text-base transform transition duration-150 active:scale-95"
                                >
                                    Submit
                                </button>
                            </div>

                            <div className="flex items-center my-6">
                                <hr className="flex-grow border-gray-300" />
                                <span className="px-4 text-sm text-gray-500">OR</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            {/* Social Login */}
                            <div className="flex justify-center gap-4">
                                {/* <div className="py-2 px-3 border rounded-full cursor-pointer">
                                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                                </div> */}
                                <div className="py-2 px-3 border rounded-xl w-80% cursor-pointer " onClick={handleGoogleAuth}>
                                    <div className='flex gap-3'>
                                        <FontAwesomeIcon
                                            icon={faGoogle}
                                            size="lg"
                                            className="text-[#DB4437] py-1"

                                        />

                                        <p>Register youself with google account</p>
                                    </div>
                                </div>
                                {/* <div className="py-2 px-3 border rounded-full cursor-pointer">
                                    <FontAwesomeIcon
                                        icon={faSkype}
                                        size="lg"
                                        className="text-[#00AFF0]"
                                    />
                                </div> */}
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <Link className="text-blue-600" to="/login">
                                        Try Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup
