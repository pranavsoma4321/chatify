import { Resend } from "resend";
import { ENV } from "./env.js";


// Create Resend client instance
export const resendClient = new Resend(ENV.RESEND_API_KEY);

// Sender configuration
export const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME,
};