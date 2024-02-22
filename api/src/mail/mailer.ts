import * as nodemailer from "nodemailer"
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
});

export const sendMail = async (mailOptions, callback) => {
  try {
    const details = await transporter.sendMail(mailOptions);
    callback();
  } catch (error) {
    console.log('error: ', error)
  }
}