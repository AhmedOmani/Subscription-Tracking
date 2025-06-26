import { aj } from "../config/arject.js"

export const arjectMiddleware = async (req , res , next) => {
    try {
        const decision = await aj.protect(req , {requested : 1});
        console.log(decision);
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({success: false, error: "Rate Limit exceeded"});
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({success: false, error: "Bot Detected"});
            }
            return res.status(403).json({success: false, error: "Access Denide"})
        }

        next();
    } catch (error) {
        console.error("Arject Middleware Error: " , error);
        next(error);
    }
}