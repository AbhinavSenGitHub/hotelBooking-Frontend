import React from 'react'

const Loader = () => {
    return (
        <div className="absolute z-50 inset-0 flex h-full items-center justify-center bg-white bg-opacity-50 backdrop-blur-md">
        {/* Tailwind Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    )
}

export default Loader
