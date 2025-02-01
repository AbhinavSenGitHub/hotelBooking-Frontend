import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation, useNavigate } from 'react-router-dom'
import { resendOTPAsync, selectOTPResendStatus, selectOTPResponse, selectOTPStatus, selectUserResponse, verificationAsync } from '../authSlice'
import Loader from '../../../common/Loader'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Slide from "@mui/material/Slide";

const EmailVarification = () => {

  const [otp, setotp] = useState(['', '', '', '', '', '']) 
  const inputRefs = useRef([]) 
  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const { handleSubmit, formState: { errors } } = useForm()
  const location = useLocation().state
  const authUser = useSelector(selectUserResponse)
  const dispatch = useDispatch()
  const otpStatus = useSelector(selectOTPStatus)
  const otpResendStatus = useSelector(selectOTPResendStatus)
  const [status, setStatus] = useState({ show: false, message: "", severity: "success" })
  const otpResponse = useSelector(selectOTPResponse)
  const navigate = useNavigate()
  const handleChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setotp(newOtp)

    if (index < inputRefs.current.length - 1 && value !== '') {
      inputRefs.current[index + 1].focus()
    }
  }

  const onSubmit = async () => {
    console.log("usejer", authUser)
    const otpString = otp.join('');
    console.log("data", otpString)
    const userData = {
      otpString: otpString,
      email: location
    }
    await dispatch(verificationAsync({ userData: userData }));

  }

  const resentOTP = async () => {
    const otpString = otp.join('');
    console.log("data", otpString)
    const userData = {
      otpString: otpString,
      email: location
    }
    await dispatch(resendOTPAsync({ userData: userData }));
    setTimer(60)
    setIsDisabled(true)
  }

  useEffect(() => {
    if (timer === 0) {
      setIsDisabled(false); // Enable the button when the timer reaches 0
      return;
    }

    // Disable the button and start the timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [timer]);

  useEffect(() => {
    // Listen for changes in otpStatus or otpResponse


    if (otpStatus === 'pending') {
      setStatus({ show: true, message: 'Verifying OTP...', severity: 'info' });
    } else if (otpStatus === 'idle') {
      // Check the otpResponse for success or error
      if (otpResponse?.severity === 'info') {
        setStatus({ show: true, message: otpResponse.message, severity: 'info' });
      } else if (otpResponse?.severity === 'success') {
        if(otpResponse.message === 'User verified successfully.'){
          navigate("/display-rooms")
        }
        setStatus({ show: true, message: otpResponse.message, severity: 'success' });
        console.log("Verification complete");
      }
    }else if (otpResendStatus === 'pending'){
      setStatus({ show: true, message: 'Resend OTP...', severity: 'info' });
    }else if(otpResendStatus === 'idle'){
      setStatus({ show: true, message: otpResponse.message, severity: 'success' });
    }

  }, [otpStatus, otpResponse, otpResendStatus]);

  return (
    <div className="w-full mt-16">

      {otpStatus === "pending" || otpResendStatus === "pending" && (
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
      <div className='flex justify-center items-center flex-col gap-8'>
        <div>
          <h3 className='text-3xl'>WorkAble</h3>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className='w-screen flex  justify-center items-center'>
            <div className='w-[400px] px-6 '>
              <div className='flex flex-col mb-2'>
                <label className='text-xl text-gray-800'>An 6 digit code has been send to your email <span className='text-blue-500'>{location}</span></label>
                <div className='flex mt-4'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-12 h-12 text-3xl border rounded mx-1 text-center"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      // onKeyPress={(e) => 
                      //   handleKeyPress(e, value)
                      // }
                      ref={(el => inputRefs.current[index] = el)}

                    />
                  ))}
                </div>
              </div>

              <button className='border w-full py-2 font-medium text-lg rounded-xl hover:text-white hover:bg-[#544455] transition duration-300' type="submit">Submit</button>

              <div className='text-center my-8'>
      <p className='text-lg'>
        You can resend the OTP after {timer} seconds
        <div
          className={`text-blue-500 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={!isDisabled ? resentOTP : null}
        >
          {isDisabled ? 'Resend OTP (Disabled)' : 'Resend OTP'}
        </div>
      </p>
    </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmailVarification
