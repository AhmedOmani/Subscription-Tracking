

export const generateReminderEmail = ({
    userName ,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    daysLeft,
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Subscription Reminder</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50;">�� Subscription Renewal Reminder</h2>
        
        <p>Hello <strong>${userName}</strong>,</p>
        
        <p>This is a friendly reminder that your <strong>${subscriptionName}</strong> subscription will renew in <strong>${daysLeft} day${daysLeft > 1 ? 's' : ''}</strong>.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Subscription Details:</h3>
            <p><strong>Plan:</strong> ${planName}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Renewal Date:</strong> ${renewalDate}</p>
        </div>
        
        <p>If you'd like to make any changes to your subscription or cancel it, please log into your account before the renewal date.</p>
        
        <p>Thank you for being a valued customer!</p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
            This is an automated reminder. Please do not reply to this email.
        </p>
    </div>
</body>
</html>
`;

export const getEmailSubject = (subscriptionName , daysLeft) => {
    if (daysLeft === 1) {
        return `Final Reminder: ${subscriptionName} Renews Tomorrow!`;
    } else if (daysLeft <= 3) {
        return `${subscriptionName} Renews in ${daysLeft} Days`;
    } else {
        return `Reminder: ${subscriptionName} Renews in ${daysLeft} Days`;
    }
};