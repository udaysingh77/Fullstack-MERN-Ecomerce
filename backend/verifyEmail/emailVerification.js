import nodemailer from "nodemailer";

function sendMail(email, token) {
  let Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailOptions;
  let sender = "uday";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Email confermation",
    text: `Press http://localhost:5173/verify/${token} to verify your email. Thanks`,
  };

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  });
}

export default sendMail;
