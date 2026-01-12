
import nodemailer from "nodemailer"

function sendMail(email,token){
    let Transport = nodemailer.createTransport({
       service:"Gmail",
       auth:{
            user:"suday7807@gmail.com",
            pass:""
       }
    });

    let mailOptions;
    let sender = "uday";
    mailOptions = {
        from:sender,
        to:email,
        subject:"Email confermation",
        html:`Press <a href=http://localhost:5172/verify/${token}> here </a> to verify your email. Thanks`
    };

    Transport.sendMail(mailOptions,function(error,response){
        if(error){
            console.log(error)
        }else{
            console.log("Message sent")
        }
    })
}

export default sendMail;