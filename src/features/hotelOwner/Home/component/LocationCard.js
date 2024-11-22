import React from 'react'
import location1 from "./location_images/location1.jpg"
import location2 from "./location_images/location2.jpg"
import location3 from "./location_images/location3.jpg"
import location4 from "./location_images/location4.jpg"
import location5 from "./location_images/location5.jpg"
const LocationCard = () => {

    const location = [
        { image: location1, title: "New York", content: "New York City pulses with endless energy, towering skyscrapers, vibrant culture, and unforgettable moments on every corner." },
        { image: location2, title: "Taj Mahal", content: "The Taj Mahal shines with timeless beauty, a symbol of love and architectural marvel in India." },
        { image: location3, title: "Chennai", content: "Chennai blends rich tradition with modernity, boasting stunning beaches, vibrant culture, and historic temples along its coast." },
        { image: location5, title: "Bangalore", content: "Bangalore, India’s tech hub, thrives with innovation, lush gardens, bustling streets, and a blend of cultures." }



    ]


    return (
        <div className='px-12 my-20'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-medium'>Explore the Best Destinations for Your Next Getaway</h1>
                <p className=''>From scenic landscapes to iconic landmarks, these places are unforgettable.</p>
                <p>These handpicked locations promise breathtaking views and unforgettable experiences.</p>
            </div>
            <div className="grid gap-4 mt-14 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30  w-full h-60 flex-shrink-0 rounded-lg shadow-lg">
                        <img src={location1} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" />


                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div class="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 class="font-dmserif text-xl font-bold text-white">New York City</h1>
                            <p class="mb-3 text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                New York City pulses with endless energy, towering skyscrapers, vibrant culture, and unforgettable moments on every corner.</p>
                            <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>

                    </div>

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30  w-full h-60 flex-shrink-0 rounded-lg shadow-lg">
                        <img src={location2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" />


                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div class="absolute inset-0 flex translate-y-[65%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 class="font-dmserif text-xl font-bold text-white">Taj Mahal</h1>
                            <p class="mb-3 text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                                The Taj Mahal shines with timeless beauty, a symbol of love and architectural marvel in India.</p>
                            <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>

                    </div>

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30  w-full h-60 flex-shrink-0 rounded-lg shadow-lg">
                        <img src={location3} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" />


                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div class="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 class="font-dmserif text-xl font-bold text-white">Chennai</h1>
                            <p class="mb-3 text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                Chennai blends rich tradition with modernity, boasting stunning beaches, vibrant culture, and historic temples along its coast.</p>
                            <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>

                    </div>

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30  w-full h-60 flex-shrink-0 rounded-lg shadow-lg">
                        <img src={location5} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" />


                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div class="absolute inset-0 flex translate-y-[65%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 class="font-dmserif text-xl font-bold text-white">Bangalore</h1>
                            <p class="mb-3 text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                Bangalore, India’s tech hub, thrives with innovation, lush gardens, bustling streets, and a blend of cultures.</p>
                            <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default LocationCard
