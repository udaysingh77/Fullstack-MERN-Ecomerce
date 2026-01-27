
import User from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import sendMail from "../verifyEmail/emailVerification.js";
import { Session } from '../models/sessionModels.js';
import { sendOtpMail } from '../verifyEmail/sendOtpMail.js';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "all field are required"
            })
        }

        const user = await User.findOne({ email })
        console.log("user", user)
        if (user) {
            return res.status(400).json({
                status: false,
                message: "User already exist, please login"
            })
        }

        const hasedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ firstName, lastName, email, password: hasedPassword })
        let token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
        sendMail(email, token)
        newUser.token = token;
        newUser.save()

        return res.status(200).json({
            status: true,
            message: "User successfuly Registor",
            newUser
        })

    } catch (error) {
        return res.status(500).json({
            status: true,
            message: error.message,
        })
    }
}

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({
                status: false,
                message: "Token isn not provided or Invalid token"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.decode(token, process.env.SECRET_KEY)
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status.json({
                    status: false,
                    message: "The registoration token has expired"
                })
            }
            return res.status.json({
                status: false,
                message: "Token varification has failed"
            })
        }

        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User not exist"
            })
        }
        user.token = null
        user.isVarified = true
        await user.save()
        return res.status(200).json({
            status: true,
            message: "User verified successfully",
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: error.message,
        })
    }

}

export const reVerify = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Email not provided"
            })
        }
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({
                status: false,
                message: "User does not exist please register first"
            })
        }
        const token = await jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
        existingUser.token = token
        await existingUser.save()
        sendMail(email, token) //email sent
        return res.status(200).json({
            status: true,
            message: "Verification sent successfully",
            token
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: error.message
        })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Provide proper credentials"
            })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({
                status: false,
                message: "please resister first"
            })
        }
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (!isMatched) {
            return res.status(400).json({
                status: false,
                message: "Incorrect password or email"
            })
        }

        if (existingUser.isVarified === false) {
            return res.status(400).json({
                status: false,
                message: "First verify then login"
            })
        }

        //Generate token
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })
        const refreshToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "30d" })

        existingUser.isLoggedIn = true
        await existingUser.save()

        //check for the existing token and delete it
        const existingSession = await Session.findById(existingUser._id)
        if (existingSession) {
            await Session.deleteOne({ userId: existingUser._id })
        }
        await Session.create({ userId: existingUser._id })

        return res.status(200).json({
            status: true,
            message: "Logging sucessful",
            user: existingUser,
            accessToken,
            refreshToken
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        const userId = req.id
        await Session.deleteMany({ userId })
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })

        return res.status(200).json({
            status: true,
            message: "User logged out Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: false,
                message: "Please provide email"
            })
        }
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(200).json({
                status: false,
                message: "User doest not exist"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) //10 min
        existingUser.otp = otp;
        existingUser.otpExpiry = otpExpiry;

        await sendOtpMail(otp, email)

        await existingUser.save();
        return res.status(200).json({
            status: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        return res.status(500).json({
            status: true,
            message: error.message
        })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email
        if (!otp) {
            return res.status(200).json({
                status: false,
                message: "otp is required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({
                status: false,
                messaage: "User does not Exist"
            })
        }

        if (!existingUser.otp || !existingUser.otpExpiry) {
            return res.status(400).json({
                status: false,
                message: "otp not generated or already verified"
            })
        }

        if (Date.now() > existingUser.otpExpiry) {
            return res.status.json({
                status: false,
                message: "Otp Exired request new Otp"
            })
        }
        if (existingUser.otp !== otp) {
            return res.status(400).json({
                status: false,
                message: "Wrong Otp please enter the correct one"
            })
        }

        existingUser.otp = null,
            existingUser.otpExpiry = null,
            await existingUser.save()

        return res.json({
            status: true,
            message: "Otp verification Successful"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const changedPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body
        const { email } = req.params
        if (!newPassword || !confirmPassword) {
            return res.status(200).json({
                status: true,
                message: "please provide the newPassword and confirmPassword"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User not Found"
            })
        }
        // const isMatched = bcrypt.compare(confirmPassword,user.password)
        // if(!isMatched){
        //     return res.status(400).json({
        //         status:false,
        //         message:"Wrong password please provide the correct one"
        //     })
        // }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: false,
                mesage: "Password do not match"
            })
        }
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save();
        return res.status(200).json({
            status: true,
            message: "Password changed Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.messsage
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        return res.status(200).json({
            status: true,
            message: "All Users Returned",
            users: allUsers
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const userById = async (req, res) => {
    try {
        let email = req.params.email

        const user = await User.findOne({ email }).select("-password -token -otp -otpExpiry")
        if (!user) {
            return res.status(400), json({
                status: false,
                message: "User not Found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "User Details",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}