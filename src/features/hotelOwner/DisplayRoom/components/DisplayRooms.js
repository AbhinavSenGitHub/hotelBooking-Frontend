import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Card from './Card'

const DisplayRooms = () => {
    return (
        <div>

            {/* top search portion */}
            <div className='flex items-center justify-center h-[100px] bg-blue-400'>
                <div className='flex border rounded-xl overflow-hidden shadow-lg'>
                    <input
                        type="search"
                        className="px-4 py-2 w-64 text-gray-700 border-none focus:outline-none"
                        placeholder="Search..."
                    />
                    <button
                        className='flex items-center justify-center px-4 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none'
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
            
            <div className='border w-1/3 flex flex-col gap-3'>
                <Card/>
            </div>
        </div>
    )
}

export default DisplayRooms
