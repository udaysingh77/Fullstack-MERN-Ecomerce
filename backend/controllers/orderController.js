
import razorpayInstance from './../config/razorpay.js';
import { Order } from './../models/orderModel';
import crypto from "crypto"

export const createOrder = async(req,res) =>{
    try {
        const {products,amount,shipping,tax,currency} = req.body;

        const options ={
            amount:Math.round(Number(amount) * 100), //convert to paise
            currency:currency || "INR",
            receipt:`recipt_${Date.now()}`
        }

        const razorpayOrder = await razorpayInstance.orders.create(options);

        //save order in DB
        const newOrder = new Order({
            user:req.user._id,
            products,
            amount,
            tax,
            shipping,
            currency,
            status:"Pending",
            razorpayOrderId:razorpayOrder.id
        })

        await newOrder.save();

        return res.status(200).json({
            status:true,
            order:razorpayOrder,
            dbOrder:newOrder
        })
    } catch (error) {
        console.log("Error in createOrder:",error)
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

export const verifyPayment = async(req,res) =>{
    try {
        const {razorpay_order_id, razorpay_payment_id,razorpay_signature,paymentFailed} = req.body;
        const userId = req.user._id
        if(paymentFailed){
            const order = await Order.findOneAndUpdate(
                {razorpayOrderId:razorpay_order_id},
                {status:"Failed"},
                {new:true}
            )
            return res.status(400).json({status:false,message:"Payment failed", order})
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");

        if(expectedSignature===razorpay_signature){
            const order = await Order.findOneAndUpdate(
                {razorpayOrderId:razorpay_order_id},
                {
                    status:"Paid",
                    razorpayPaymentId:razorpay_payment_id,
                    razorpaySignature:razorpay_signature
                },
                {new:true}
        )

        await Cart.findOneAndUpdate({userId},{$set:{items:[],totalPrice:0}})
        return res.json({status:true,message:"Payment Successfull",order})
        }else{
            await Order.findOneAndUpdate(
                {razorpayOrderId:razorpay_order_id},
                {status:"Failed"},
                {new:true}
            )
            return res.status(400).json({status:false,message:"Invalid Signature"})
        }
    } catch (error) {
        console.log("Error in verifyPayment",error)
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
} 