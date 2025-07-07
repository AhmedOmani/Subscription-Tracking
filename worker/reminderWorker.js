import { Worker } from "bullmq";
import IORedis from "ioredis";
import dayjs from "dayjs";
import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/sendEmails.js";
import User from "../models/user.model.js";
import { REDIS_HOST , REDIS_PORT , DB_URI } from "../config/env.js";

const connection = new IORedis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    maxRetriesPerRequest: null ,
});

const connectDB = async () => {
    try {
        mongoose.connect(DB_URI);
        console.log("Worker Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: " , error);
        process.exit(1);
    }
};

connectDB().then(() => {
    const reminderWorker = new Worker("reminderQueue" , async (job) => {
        console.log(`Processing remider job ${job.id} for subscription ${job.data.subscriptionId}`);

        try {
           
            const subscription = await Subscription.findById(job.data.subscriptionId).populate("user", "name email");
            

            if (!subscription) {
                console.log(`Subscription ${job.data.subscriptionId} not found`);
                return;
            }

            if (subscription.status !== "active") {
                console.log(`Subscription ${job.data.subscriptionId} is not active`);
                return ;
            }

            if (dayjs(subscription.renewalDate).isBefore(dayjs())) {
                console.log(`RenewalDate is already passed for subscription ${job.data.subscriptionId}`);
                return;
            }

            console.log(`Sending remider email to ${subscription.user.email}`);

            //TODO: Send Email Logic
            await sendReminderEmail({
                to: subscription.user.email,
                subscription: subscription,
                daysBefore: job.data.daysBefore
            });

            console.log(`Successfully sent reminder for subscription ${job.data.subscriptionId}`);
        
        } catch (error) {
            console.error(`Error processing remider for subscription ${job.data.subscriptionId}`);
            throw error;
        }
    }, {
        connection ,
        concurrency: 1
    });

    reminderWorker.on("completed" , (job) => {
        console.log(`Job ${job.id} completed successfully`);
    });
    
    reminderWorker.on("failed" , (job , error) => {
        console.error(`Job ${job.id} failed:`, error.message);
    });
    
    reminderWorker.on("error" , (error) => {
        console.error("Worker error: " , error);
    });
    
    console.log("Reminder worker started and listening for jobs");


});

