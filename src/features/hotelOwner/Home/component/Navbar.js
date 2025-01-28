// import React, { useState } from 'react'
// import { Link, Outlet } from 'react-router-dom'
// import logo from "../image/logo.svg"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faBurger, faTimes } from '@fortawesome/free-solid-svg-icons'

// const Navbar = () => {

//     const [open, setOpen] = useState(false)
//     return (
//         <>
//             <nav>

//                 {!open ? <div className='flex text-white justify-around py-3 bg-[#003580]'>
//                     <img src={logo} className='h-[40px] w-[200px]' alt='logo' />
//                     <div className='flex gap-8'>
//                         <button>Language</button>
//                         <button>Support</button>
//                         <button>List your property</button>
//                         <Link to={"/signup"} className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Register</Link>

//                         <Link to="/login" className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Sign in</Link>
//                     </div>
//                 </div>
//                     :
//                     (
//                         <div className='flex text-white justify-around py-3 bg-[#003580]'>
//                             <img src={logo} className='h-[40px] w-[200px]' alt='logo' />
//                             <FontAwesomeIcon icon={faBars}/>
//                             <FontAwesomeIcon icon={faTimes}/>
//                         </div>
//                     )
//                 }
//             </nav>
//             <Outlet />
//         </>
//     )
// }

// export default Navbar





import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from "../image/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../../auth/authSlice'
import { logoutUserAsync, selectUserResponse } from '../../../auth/authSlice'

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const userToken = useSelector(selectToken)
    const userResponse = useSelector(selectUserResponse)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (!userResponse) {
    //         navigate("/");
    //     }
    // }, [userToken, navigate]);
    const handleLogout = () => {
        dispatch(logoutUserAsync())
       
    }
    return (
        <>
            <nav className='bg-[#003580] py-3'>
                <div className='flex items-center justify-between px-6 text-white'>

                    {/* Logo */}
                    <img src={logo} className='h-[40px] w-[200px]' alt='logo' />

                    {/* Desktop Menu */}
                    <div className='hidden lg:flex gap-8 items-center'>
                        <button>Language</button>
                        <button>Support</button>
                        <Link to="display-rooms">Display rooms</Link>

                        {userResponse ?
                            (<div className='flex gap-6'>
                                <Link to="/owner-profile">Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>)
                            :
                            (<div className='flex gap-6'>
                                <Link to={"/signup"} className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Register</Link>
                                <Link to="/login" className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Sign in</Link>
                            </div>)
                        }

                    </div>

                    {/* Hamburger Icon */}
                    <div className='lg:hidden'>
                        <button onClick={() => setOpen(!open)}>
                            {open ? (
                                <FontAwesomeIcon icon={faTimes} className='text-2xl' />
                            ) : (
                                <FontAwesomeIcon icon={faBars} className='text-2xl' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className='lg:hidden flex flex-col items-end pr-6 gap-6 mt-4 text-white'>
                        <button>Language</button>
                        <button>Support</button>
                        <button>List your property</button>
                        <Link to={"/signup"} className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Register</Link>
                        <Link to="/login" className='bg-white flex items-center text-[#003580] px-3 rounded-lg font-medium'>Sign in</Link>
                    </div>
                )}
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar
