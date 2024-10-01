import React from 'react'
import location1 from "./location_images/location1.jpg"
import location2 from "./location_images/location2.jpg"
import location3 from "./location_images/location3.jpg"
import location4 from "./location_images/location4.jpg"
import location5 from "./location_images/location5.jpg"
const GetHotel = () => {
  return (
    <div className='flex justify-center mt-20'>
      <div className=''>
        <h1 className='text-2xl font-medium '>Get Hotel to Nearest Trending destinations</h1>

        {/* location card */}
        {/* <div>
          <div className=''>
            <img src={location1} className='h-[40vh] absolute w-[70vh] object-cover ' alt="image" />
            <p className='absolute text-white z-3 font-bold text-2xl px-2 py-3 '>Khao Sok National Park </p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default GetHotel
