import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARJECT_KEY } from "./env.js"

export const aj = arcjet({
    key: ARJECT_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE"}),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
})