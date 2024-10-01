import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from "../image/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBurger, faTimes } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const [open, setOpen] = useState(false)
    return (
        <>
            <nav>

                {!open ? <div className='flex text-white justify-around py-3 bg-[#003580]'>
                    <img src={logo} className='h-[40px] w-[200px]' alt='logo' />
                    <div className='flex gap-8'>
                        <button>Language</button>
                        <button>Support</button>
                        <button>List your property</button>
                        <Link to={"/signup"} className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Register</Link>

                        <Link to="/login" className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Sign in</Link>
                    </div>
                </div>
                    :
                    (
                        <div className='flex text-white justify-around py-3 bg-[#003580]'>
                            <img src={logo} className='h-[40px] w-[200px]' alt='logo' />
                            <FontAwesomeIcon icon={faBars}/>
                            <FontAwesomeIcon icon={faTimes}/>
                        </div>
                    )
                }
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar
