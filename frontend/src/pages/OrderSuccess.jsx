import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from "lucide-react";


const OrderSuccess = () => {
    const navigate = useNavigate()
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            {/* Success Icon */}
            <div className="flex justify-center">
                <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            {/* Message */}
            <h1 className="font-bold text-2xl pt-4">Payment Successful✅</h1>

            {/* Message */}
            <p className="mt-2 text-gray-600">Thank you for your purchase! Your order has been placed</p>

            {/* Button */}
            <div className=" flex flex-col mt-6 gap-3">
                <button onClick={()=>navigate("/")} className="w-full rounded-xl bg-pink-600 py-3 text-white hover:bg-pink-700 transition">Contiue Shopping</button>
                <button onClick={()=>navigate("/orders")} className=" border w-full rounded-xl border-pink-600 py-3 hover:bg-pink-50 transition">View My Order</button>
            </div>
        </div>
    </div>
  )
}

export default OrderSuccess