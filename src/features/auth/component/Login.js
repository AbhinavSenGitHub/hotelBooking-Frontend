import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle ,faSkype, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="w-full mt-8">
    <div className='flex justify-center items-center flex-col gap-8'>
        <div>
            <h3 className='text-3xl'>WorkAble</h3>
        </div>

        <div>
            <form className='w-screen flex  justify-center items-center'>
                <div className='w-[500px] px-6 '>
                    <div className='flex flex-col mb-2'>
                        <label className='text-xl text-gray-800'>Email</label>
                        <input className="border px-4 py-2 my-3 rounded-xl border-gray-300" type="email" placeholder='Username' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='text-xl text-gray-800'>Password</label>
                        <input className="border px-4 py-2 mt-3 rounded-xl border-gray-300" type="text" placeholder='Username' />
                        <p className='mb-4 mt-1 flex justify-end py-0'>forgot password?</p>
                    </div>
                    
                    <button className='border w-full py-2 font-medium text-lg rounded-xl hover:text-white hover:bg-[#544455] transition duration-300' type="submit">Submit</button>

                    <div className='flex items-center my-8'>
                        <hr className='flex-grow border-gray-300' />
                        <span class="px-4 text-gray-500">OR</span>
                        <hr className='flex-grow  border-gray-300' />
                    </div>
                    
                    <div className='flex gap-6 items-center justify-center'>
                        <div className='py-2 border px-6 rounded-xl '><FontAwesomeIcon icon={faXTwitter} size="2x" /></div>
                        <div className='py-2 border px-6 rounded-xl '>
                            <FontAwesomeIcon icon={faGoogle} size="2x" className='text-[#DB4437]' />
                        </div>
                        <div className='py-2 border px-6 rounded-xl '>
                            <FontAwesomeIcon icon={faSkype} size="2x" className='text-[#00AFF0]' />
                        </div>
                    </div>
                    <div className='text-center my-8'>
                        <p className='text-lg'>Don't have an account? <Link className='text-blue-500' to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login
