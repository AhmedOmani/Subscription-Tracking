import nodemailer from "nodemailer";

import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } from "./env.js";

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === '465',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    }
});

transporter.verify(function(error , success) {
    if (error) {
        console.log("Email server error: " , error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

export { transporter } ; 