import React, { useRef, useState } from 'react'
import location1 from "./location_images/location1.jpg"
import asia from "../image/asia.webp"
import japan from "../image/japan.webp"
import wellness from "../image/wellness.jpg"
import winter from "../image/winter.webp"
import christmas from "../image/christmas.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'


import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GetHotel = () => {

    const hotels = [
        { image: asia, title: 'Best place in Aias', content: 'The best place in Aias offers breathtaking views, delicious food, friendly people, and unforgettable memories.' },
        { image: japan, title: 'Ryokans in Japan', content: 'Ryokans in Japan provide traditional lodging experiences with tatami floors, onsen baths, and exquisite cuisine.' },
        { image: wellness, title: 'Wellness Restreat', content: 'A wellness retreat offers relaxation, meditation, healthy meals, yoga, and spa treatments for rejuvenation.' },
        { image: winter, title: 'Winter spots', content: 'Winter spots offer scenic snow-capped mountains, cozy cabins, skiing adventures, and festive holiday charm.' },
        { image: christmas, title: 'Christmas in London', content: 'Christmas in London features dazzling lights, festive markets, ice skating rinks, and iconic holiday decorations.' },
        // Add more items as needed
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 3;

    const scrollLeft = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? hotels.length - itemsToShow : prevIndex - 1
        );
    };

    const scrollRight = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === hotels.length - itemsToShow ? 0 : prevIndex + 1
        );
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,        // Show 4 cards by default on large screens
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1280,  // Below 1280px
                settings: {
                    slidesToShow: 3, // Show 3 cards
                }
            },
            {
                breakpoint: 1024,  // Below 1024px
                settings: {
                    slidesToShow: 2, // Show 2 cards
                }
            },
            {
                breakpoint: 640,   // Below 640px (mobile)
                settings: {
                    slidesToShow: 1, // Show 1 card
                }
            }
        ]
    };

    const cards = [
        { id: 1, image: asia, title: 'Best place in Aias' },
        { id: 2, image: japan, title: 'Ryokans in Japan' },
        { id: 3, image: winter, title: 'Winter spots' },
        { id: 4, image: wellness, title: 'Wellness Restreat' },
        { id: 5, image: christmas, title: 'Christmas in London' },
    ];


    return (
        <div className='my-20 px-12'>
            <div className='flex flex-col mb-8  gap-2'>
                <h1 className='text-2xl font-medium'>Find Hotels Near the Hottest Trending Destinations</h1>
                <p className=''>Explore popular spots and stay just minutes from the action.</p>
                <p>Your perfect getaway is closer than you think!</p>
            </div>
            <div className="w-full   mt-8">
                <Slider {...settings}>
                    {hotels.map(card => (
                        <div key={card.id} className="p-4 overflow-hidden relative group">
                            <div className="relative w-full h-60 mx-auto overflow-hidden rounded-lg shadow-lg">
                                <div className='h-full'>
                                    <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-500  group-hover:scale-125" />
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                <div class="absolute inset-0 flex translate-y-[70%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                    <h1 class="font-dmserif text-xl font-bold text-white">{card.title}</h1>
                                    <p class="mb-3 text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{card.content}</p>
                                    <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default GetHotel
