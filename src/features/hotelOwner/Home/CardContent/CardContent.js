import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../component/Footer';

const CardContent = () => {
  const [width, setWidth] = useState("w-0");
  const location = useLocation().state;
  console.log("location in place content", location);

  useEffect(() => {
    setTimeout(() => {
      setWidth("w-full");
    }, 100);
  }, []);

  return (
    <div className="py-12 px-4 sm:px-8">
      {/* Title */}
      <h1 className="text-4xl sm:text-7xl md:text-8xl text-gray-600 text-center sm:text-left">
        {location.title}
      </h1>

      {/* Animated Underline */}
      <div
        className={`border mt-2 border-b-2 border-black transition-all duration-1000 ${width}`}
      ></div>

      {/* Main Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center sm:items-start my-16 sm:my-20 justify-between px-2 sm:px-6 gap-8"
      >
        {/* Text Section */}
        <div className="w-full sm:w-[60%] text-center sm:text-left">
          <p className="text-xl sm:text-3xl">{location.details}</p>
          <Link to="/display-rooms">
          <button className="px-4 py-2 mt-6 border rounded-full text-white bg-[#003580] hover:bg-[#002766] transition-all duration-300">
            Want to make booking →
          </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full sm:w-[40%] flex justify-center">
          <img
            className="max-w-[90%] sm:max-w-[500px] border rounded-xl shadow-lg"
            src={location.image}
            alt="Location"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default CardContent;
