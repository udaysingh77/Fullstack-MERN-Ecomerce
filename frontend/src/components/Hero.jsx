import React from 'react'
import { Button } from './ui/button'
import phone from "../assets/phone.png"

const Hero = () => {
    return (
        <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16'>
            <div className=' max-w-7xl mx-auto px-4'>
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Latest Electronics at Best Price
                        </h1>

                        <p className="text-lg md:text-xl text-blue-100 max-w-lg">
                            Discover cutting-edge technology with unbeatable deals on smartphones, laptops and more
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                                Shop Now
                            </Button>

                            <Button className="border-white text-white hover:text-blue-600 bg-transparent">
                                View Details
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex justify-center md:justify-end">
                        <img
                            src={phone}
                            alt="mobile img"
                            className="w-[280px] md:w-[350px] lg:w-[420px] rounded-2xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero