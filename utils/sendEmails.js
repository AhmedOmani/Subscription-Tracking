import { transporter } from "../config/nodemailer.js";
import { generateReminderEmail , getEmailSubject } from "./emailTemplates.js";
import { EMAIL_USER } from "../config/env.js";

export const sendReminderEmail = async ({
    to,
    subscription,
    daysBefore,
}) => {
     
    try {
        const emailHtml = generateReminderEmail({
            username: subscription.user.name,
            subscriptionName: subscription.name,
            renewalDate: subscription.renewalDate.toLocaleDateString(),
            planName: subscription.name,
            price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
            paymentMethod: subscription.paymentMethod,
            daysLeft: daysBefore,
        });

        const subject = getEmailSubject(subscription.name , daysBefore);

        const mailOptions = {
            from: EMAIL_USER,
            to: to ,
            subject: subject,
            html: emailHtml,
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: " , info.messageId);

        return {
            success: true ,
            messageId: info.messageId
        }
    
    
    } catch(error) {
        console.error("Error sending reminder email: " , error);
        throw error;
    }
}