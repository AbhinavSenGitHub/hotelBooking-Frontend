import React from 'react'
import asia from "../image/asia.webp"
import japan from "../image/japan.webp"
import wellness from "../image/wellness.jpg"
import winter from "../image/winter.webp"
import christmas from "../image/christmas.webp"


import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from '../Map'
import { Link, useNavigate } from 'react-router-dom'

const GetHotel = () => {

    const hotels = [
        { image: asia, title: 'Best Place in Asia', content: 'The best place in Aias offers breathtaking views, delicious food, friendly people, and unforgettable memories.', details: "The most spectacular destination in Aias, where breathtaking views captivate your soul, mouthwatering cuisine delights your taste buds, warm-hearted people make you feel at home, and every moment becomes an unforgettable memory to cherish forever." },
        { image: japan, title: 'Ryokans in Japan', content: 'Ryokans in Japan provide traditional lodging experiences with tatami floors, onsen baths, and exquisite cuisine.', details: "Ryokans in Japan offer an authentic and serene traditional lodging experience, featuring elegant tatami-matted rooms, soothing onsen hot spring baths, and exquisite multi-course kaiseki cuisine, all wrapped in the warmth of Japanese hospitality." },
        { image: wellness, title: 'Wellness Restreat', content: 'A wellness retreat offers relaxation, meditation, healthy meals, yoga, and spa treatments for rejuvenation.', details: "A wellness retreat is a sanctuary of peace and rejuvenation, where relaxation meets mindfulness through meditation, nutritious gourmet meals, revitalizing yoga sessions, and indulgent spa treatments, leaving you refreshed in body, mind, and spirit." },
        { image: winter, title: 'Winter Spots', content: 'Winter spots offer scenic snow-capped mountains, cozy cabins, skiing adventures, and festive holiday charm.', details: "Winter destinations transform into magical wonderlands, boasting breathtaking snow-covered mountains, charming and cozy cabins, thrilling skiing and snowboarding adventures, and a festive atmosphere filled with twinkling lights and holiday cheer." },
        { image: christmas, title: 'Christmas in London', content: 'Christmas in London features dazzling lights, festive markets, ice skating rinks, and iconic holiday decorations.', details: "Christmas in London is a mesmerizing celebration of joy and festivity, with dazzling light displays illuminating the city, enchanting Christmas markets offering seasonal delights, picturesque ice-skating rinks, and iconic holiday decorations adorning historic streets and landmarks." },
        // Add more items as needed
    ];

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
    }
    const navigate = useNavigate()

    const handelClick = (data) => {
        navigate('/place-content', {state: data})
    }
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
                                    <button onClick={() => handelClick(card)} class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
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
