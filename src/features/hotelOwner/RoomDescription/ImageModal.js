import React from 'react';

const ImageModal = ({ isOpen, onClose, hotelImage, roomImage }) => {
  if (!isOpen) return null;

  // Merge room and hotel images, with room images first
  const images = [...roomImage, ...hotelImage];

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" >
   
    <div className="bg-white border rounded-xl pl-6 pb-8 max-w-4xl w-full max-h-[80vh] relative">
    <div className='w-full flex justify-between mb-6'>
    <p className='pt-4'>All images of hotel and room ({images.length}) images</p>
    <p className='text-black text-4xl pr-2 cursor-pointer' onClick={onClose}>&times;</p>
    </div>
      {/* Close Button */}
    

      {/* Display images in a grid with a scrollable content area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[70vh] pr-2">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ImageModal;
