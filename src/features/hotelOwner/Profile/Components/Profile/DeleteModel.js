import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHotelAsync, selectStatus } from '../../../EditHotel/EditHotelSlice'
import { useNavigate } from 'react-router-dom'
import { deleteRoomAsync } from '../../../RoomDescription/EditRoomSlice'

const DeleteModel = ({ isOpen, onClose, objName, fieldName, id, token, name }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    if (!isOpen) {
        return null;
    }
    const handleDelete = () => {
        if (objName === 'hotel') {
            console.log('objName', objName)
            dispatch(deleteHotelAsync({ accessToken: token, hotelId: id }))
            onClose()
        setTimeout((() => navigate("/owner-profile")), 500)
        } else if (objName === 'room') {
            dispatch(deleteRoomAsync({ accessToken: token, roomId: id}))
            onClose()
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        
            <div className="bg-white mx-3 rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col justify-center">
                <div>
                    <h1 className='text-2xl'>Are you sure you want to delete <span className='font-extrabold'>{name}</span> {objName} ? {objName === 'hotel' ? <span>by deleting a hotel will also remove all associated rooms.</span> : (<span></span>)}
                    </h1>
                    <div className='flex gap-4 mt-6'>
                        <button className='bg-[#003580] text-white px-4 py-3 rounded-lg transition duration-150 active:scale-95' onClick={onClose}>Cancel</button>
                        <button className='bg-red-600 text-white px-4 py-3 rounded-lg trasition duration-150 active:scale-95' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModel
