"use server";
import nodemailer from "nodemailer";

export const onMailer = (email: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  });
  const mailOptions = {
    to: email,
    subsject: "Realtime Support",
    text: "One your customer on Vend AI just swtiched to Realtime mode",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};
