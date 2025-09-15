import { resendClient , sender} from "../../lib/resend.js" 
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";

export const sendwelcomeEmail = async (email, name, clientURL) => {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Messenger!",
            html: createWelcomeEmailTemplate(name, clientURL),
        });
        if (error) {
            console.error("Error sending welcome email:", error);
            throw new Error("Failed to send welcome email");
        }

        console.log("Welcome email sent successfully:", data);
    }