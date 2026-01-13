
import User from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import sendMail from "../verifyEmail/emailVerification.js";

export const createUser = async(req,res)=>{
    try {
        const {firstName, lastName, email, password} = req.body

        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                status:false,
                message:"all field are required"
            })
        }

        const user = await User.findOne({email})
        console.log("user",user)
        if(user){
            return res.status(400).json({
                status:false,
                message:"User already exist, please login"
            })
        }

        const hasedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({firstName, lastName, email, password:hasedPassword})
        let token = await jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"10m"})
        console.log("tokeN=>",token)
        sendMail(email,token)
        newUser.token = token;
        newUser.save()

        return res.status(400).json({
            status:true,
            message:"User successfuly Registor"
        })

    } catch (error) {
        console.log(error);
    }
}