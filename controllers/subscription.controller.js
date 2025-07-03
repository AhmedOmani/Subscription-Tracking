import Subscription from "../models/subscription.model.js"
import { SERVER_URL } from "../config/env.js";
import { reminderQueue } from "../config/redis.js";
import dayjs from "dayjs";
const reminders = [7 , 4 , 1];

export const createSubscription = async (req , res , next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        if (!subscription) {
            const error = new Error("Subscription creation failed");
            error.staus = 400 ;
            throw error;
        }

        if (subscription.status !== "active" || dayjs(subscription.renewalDate).isBefore(dayjs())) {
            const error = new Error("Subscription created but is not active and the renewal date is passed");
            error.status = 409;
            throw error;
        }

        for (const daysBefore of reminders) {
            const reminderDate = dayjs(subscription.renewalDate).subtract(daysBefore , "day") ;
            if (reminderDate.isAfter(dayjs())) {
                await reminderQueue.add("sendReminder" , {
                    subscriptionId: subscription._id,
                    daysBefore
                }, {
                    delay: reminderDate.diff(dayjs()),
                    attempts: 3,
                });
            }
        };

        return res.status(201).json({
            success: true,
            message: "Subscription created and reminders scheduled",
            data: subscription
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const getUserSubscriptions = async (req , res , next) => {
    try {

        if (req.user._id != req.params.id) {
            const error = new Error("You are not owner of this account");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user : req.params.id});
        res.status(200).json({
            sucess: true,
            message: "Your subscriptions fetched successfully",
            data: subscriptions
        });

    } catch(error) {
        next(error);
    }
}

