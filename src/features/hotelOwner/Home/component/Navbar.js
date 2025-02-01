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





import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import heavenStay from "../image/heavenStay.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, selectUserResponse } from '../../../auth/authSlice'

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const userResponse = useSelector(selectUserResponse)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logoutUserAsync())
        navigate("/")
    }
    return (
        <>
            <nav className='bg-[#003580] relative py-6'>
                <img src={heavenStay}
                    className="h-[140px] absolute top-[-25px] px-3"
                    alt="logo" />
                <div className='flex items-center justify-between px-8 text-white'>

                    {/* Logo */}
                    <div></div>


                    {/* Desktop Menu */}
                    <div className='hidden lg:flex gap-8 items-center'>
                        <Link to="/">Home</Link>
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
                    <div className="relative">
                        <div className="lg:hidden flex flex-col absolute top-7 right-0 h-screen w-[300px] bg-white text-[#003580] shadow-lg z-50">
                            <Link to="/">
                                <div className="border-b py-4 px-4 flex justify-start hover:bg-gray-100 cursor-pointer">
                                    <button className="w-full text-left font-medium">Home</button>
                                </div>
                            </Link>
                            <div className="border-b py-4 px-4 flex justify-start hover:bg-gray-100 cursor-pointer">
                                <button className="w-full text-left font-medium">Support</button>
                            </div>

                            <Link to="display-rooms"><div className="border-b py-4 px-4 flex justify-start hover:bg-gray-100 cursor-pointer">

                                <button className="w-full text-left font-medium">Display rooms</button>
                            </div> </Link>
                            {userResponse ?
                                <Link to="owner-profile"><div className="border-b py-4 px-4 flex justify-start hover:bg-gray-100 cursor-pointer">

                                    <button className="w-full text-left font-medium">Profile</button>
                                </div> </Link> : ''}
                            {userResponse ? (
                                <div className='mt-6 flex flex-col space-y-3 px-4'>
                                    <button onClick={handleLogout} className="text-[#003580] bg-gray-100 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition">Logout</button>
                                </div>
                            )
                                :
                                (
                                    <div className="mt-6 flex flex-col space-y-3 px-4">
                                        <Link
                                            to="/signup"
                                            className="text-[#003580] bg-gray-100 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                                        >
                                            Register
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="text-[#003580] bg-gray-100 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                                        >
                                            Sign in
                                        </Link>
                                    </div>
                                )}

                        </div>
                    </div>

                )}
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar
