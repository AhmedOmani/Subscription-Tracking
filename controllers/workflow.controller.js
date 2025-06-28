import {createRequire} from "module";
const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express")
import Subscription from "../models/subscription.model.js";

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload ;
    const subscription = await fetchSubscription(context , subscriptionId);
});

const fetchSubscription = async (context , subscriptionId) => {
    return await context.run("get subscription" , async () => {
        return Subscription.findById(subscriptionId).populate("user" , "name email");
    });
}