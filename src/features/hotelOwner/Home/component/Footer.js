import { faEnvelope, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, message });
        setEmail('')
        setMessage('')
    };

    return (
        <footer className="bg-[#003580] text-white py-12 px-12 border-t-2">
            <div className="container mx-auto flex flex-wrap justify-between px-6">
                {/* Sections for Hosting a Hotel and Booking a Room */}
                <div className="w-full flex flex-wrap gap-4 lg:w-1/2 mb-12 lg:mb-0">
                    <div className="w-full lg:w-1/2 text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-bold mb-4">HEAVEN STAY</h2>
                        <p className="text-lg mb-4">Become a part of our platform and offer your rooms to guests around the world.</p>
                        <ul className="list-disc pl-6 mb-4 text-lg">
                            <li>Reach a global audience of travelers</li>
                            <li>Easy-to-use platform to manage bookings</li>
                            <li>24/7 customer support for you and your guests</li>
                        </ul>
                        <p className="text-lg mb-4">Looking for a great place to stay? Book your room with us today!</p>
                        <ul className="list-disc pl-6 mb-4 text-lg">
                            <li>Browse a wide variety of hotels and rooms</li>
                            <li>Filter by location, price, and amenities</li>
                        </ul>
                    </div>
                </div>

                {/* Contact Form on the Right Side */}
                <div className="w-full lg:w-1/2 mt-12 px-4 lg:mt-0">
                    <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto lg:mx-0 w-full">
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-lg font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-transparent border border-white rounded-md text-white placeholder-white focus:outline-none"
                                placeholder="email123@mail.com"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-lg font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 bg-transparent border border-white rounded-md text-white placeholder-white focus:outline-none"
                                placeholder="Write your message"
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-white text-[#003580] rounded-full hover:bg-[#002766] hover:text-white transition-all duration-300 w-full mb-10"
                        >
                            Submit
                        </button>

                        <div className='h-fll flex gap-4 items-end'>
                            <p><FontAwesomeIcon className='mr-1' icon={faEnvelope}/>: abhinavsen413@gmail.com</p>
                            <p><FontAwesomeIcon  className='mr-1'  icon={faPhone}/>:  +91 7049564766</p>
                        </div>
                    </form>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
