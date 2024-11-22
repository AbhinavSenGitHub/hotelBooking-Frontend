import React from 'react'
import Card from './Card'
import SearchBar from '../../Home/component/SearchBar'
const DisplayRooms = () => {
    return (
        <div>

            {/* top search portion */}
            <div className='flex items-center justify-center h-fit py-8 bg-[#003580]'>
                <SearchBar />
            </div>
            <Card/>
        </div>
    )
}

export default DisplayRooms
