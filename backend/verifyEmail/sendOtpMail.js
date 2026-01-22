import nodemailer from "nodemailer"
export const sendOtpMail = (otp,email)=>{
    try {
        const Transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })


        let mailOptions = {
            from:process.env.MAIL_USER,
            to:email,
            subject:"Password Reset OTP",
            html:`<p>This is your <b>OTP : ${otp}</b> for Password Reset</p>`
        }

        Transport.sendMail(mailOptions,(error,info)=>{
            if(error) throw new Error(error)
            console.log("Email Otp Sent");
            console.log(" otp email sent info", info);
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}