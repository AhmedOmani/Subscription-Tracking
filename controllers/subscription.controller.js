import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req , res , next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        return res.status(201).json({
            success: true,
            message: "Subscription created successfully",
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
            message: "Your subscription fetched successfully",
            data: subscriptions
        });

    } catch(error) {
        next(error);
    }
}