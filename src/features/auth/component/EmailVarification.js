import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const EmailVarification = () => {

  const [otp, setotp] = useState(['', '', '', '', '', '']) // Array to store otp
  const inputRefs = useRef([]) //Ref to hold refrencs to all input fileds

  const handleChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setotp(newOtp)

    if( index < inputRefs.current.length - 1 && value !== ''){
      inputRefs.current[index + 1].focus()
    }
  }
  
  return (
    <div className="w-full mt-16">
      <div className='flex justify-center items-center flex-col gap-8'>
        <div>
          <h3 className='text-3xl'>WorkAble</h3>
        </div>

        <div>
          <form noValidate className='w-screen flex  justify-center items-center'>
            <div className='w-[400px] px-6 '>
              <div className='flex flex-col mb-2'>
                <label className='text-xl text-gray-800'>An 6 digit code has been send to your email <span className='text-blue-500'>example123@gmail.com</span></label>
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
                <p className='text-lg'>You can resend the OTP after 34 second <Link className='text-blue-500' to="/login">Resend OTP</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmailVarification
