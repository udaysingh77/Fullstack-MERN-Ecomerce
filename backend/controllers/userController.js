
import User from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import sendMail from "../verifyEmail/emailVerification.js";

export const register = async(req,res)=>{
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
        sendMail(email,token)
        newUser.token = token;
        newUser.save()

        return res.status(200).json({
            status:true,
            message:"User successfuly Registor",
            newUser
        })

    } catch (error) {
        return res.status(500).json({
            status:true,
            message:error.message,
        })
    }
}

export const verify = async(req,res)=>{
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.json({
                status:false,
                message:"Token isn not provided or Invalid token"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
          decoded = jwt.decode(token,process.env.SECRET_KEY)  
        } catch (error) {
            if(error.name==="TokenExpiredError"){
                return res.status.json({
                    status:false,
                    message:"The registoration token has expired"
                })
            }
            return res.status.json({
                status:false,
                message:"Token varification has failed"
            })
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                status:false,
                message:"User not exist"
            })
        }
        user.token = null
        user.isVarified = true
        await user.save()
        return res.status(200).json({
            status:true,
            message:"User verified successfully",
        })
    } catch (error) {
        return res.status(500).json({
            status:true,
            message:error.message,
        })
    }

}


export const reVerify = async(req,res)=>{
    try {
        const {email} = req.body
        if(!email){
            return res.status(400).json({
                status:false,
                message:"Email not provided"
            })
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                status:false,
                message:"User does not exist please register first"
            })
        }
        const token = await jwt.sign({id:existingUser._id},process.env.SECRET_KEY)
        existingUser.token = token
        await existingUser.save()
        sendMail(email,token) //email sent
        return res.status(200).json({
            status:true,
            message:"Verification sent successfully",
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:true,
            message:"Verification Failed"
        })
    }

}


export const login = (req,res) =>{
 try {
    const {email,password} = req.body
    if(!email || !password ){
        return res.status(400).json({
            status:false,
            message:"Provide proper credentials"
        })
    }
    
 } catch (error) {
    return res.status(500).json({
        status:true,
        message:"Login Failed"
    })
 }   
}