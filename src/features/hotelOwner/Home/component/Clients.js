import React from 'react'
import client1 from "./clientImage/client1.png"
import client2 from "./clientImage/client2.png"
import client3 from "./clientImage/client3.png"
import client4 from "./clientImage/client4.png"
import client5 from "./clientImage/client5.png"
const Clients = () => {

    const clients = [
        { image: client1 },
        { image: client2 },
        { image: client3 },
        { image: client4 }
    ]
    return (
        <div className='px-12 mt-8'>
            <div className='flex flex-col  gap-2'>
                <h1 className='text-2xl font-medium'>Trusted by Leading Clients for Exceptional Stays</h1>
                <p className=''>From business travelers to vacationers, our clients enjoy top-tier hospitality</p>
                <p>Our clients trust us for quality, comfort, and unforgettable stays.</p>
            </div>
            <div className='flex justify-center items-center my-14 gap-4 flex-wrap'>
                <img className='h-[220px] w-[280px]' src={client1} />
                <img className='h-[130px] w-[150px]' src={client2} />
                <img className='h-[130px] w-[150px]' src={client3} />
                <img className='h-[200px] w-[250px]' src={client4} />
                <img className='h-[200px] w-[250px]' src={client5} />

            </div>
        </div>
    )
}

export default Clients
