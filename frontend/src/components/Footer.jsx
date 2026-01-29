import { BaggageClaim } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
            {/* info */}
            <div className="mb-6 md:mb-0">
                <Link to="/">
                    <BaggageClaim size={50} color="red" />
                </Link>
                <p className="mt-2 text-sm">Power your world with the best in Electronics</p>
                <p className="mt-2 text-sm">123 Electronics St, style city, NY 10001</p>
                <p className="mt-2 text-sm">Email:support@Zaptro.com</p>
                <p className="mt-2 text-sm">Phone:(123) 456-7890</p>
            </div>
            {/* Customer Service link */}
            <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold">Customer Service</h3>
                <ul className="mt-2 text-sm space-y-2">
                    <li>Contact Us</li>
                    <li>Shipping & Returns</li>
                    <li>FAQs</li>
                    <li>Order Tracking</li>
                    <li>Size Guide</li>
                </ul>
            </div>
            {/* social media link */}
            <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold">Follow Us</h3>
                <div className="flex mt-2 space-x-4">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitterSquare />
                    <FaPinterest />
                </div>
            </div>
            {/* newsLatter Subscription */}
            <div>
                <h3 className="text-xl font-semibold">NewsLetter</h3>
                <p className="mt-2 text-sm">Subscribe to our newsletter to get the latest updates and offers</p>
                <form action="" className="mt-4 flex">
                    <input type="email" placeholder="Enter your email" className="w-full p-2 rounded-md text-gray-400 bg-white focus:outline-none focus:right-2 focus:ring-gray-500 " />
                    <button type="submit" className="bg-pink-600 text-white px-4 hover:bg-pink-700 rounded-r-md">Subscribe</button>
                </form>
            </div>
        </div>
            {/* bottom Section */}
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
                <p>&copy; {new Date().getFullYear()}<span className="text-pink-600">EKart</span>.All right reserved</p>
            </div>
    </footer>
  )
}

export default Footer