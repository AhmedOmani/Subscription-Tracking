import { Queue } from "bullmq";
import  IORedis from "ioredis";
import { REDIS_HOST , REDIS_PORT } from "./env.js";

const connection = new IORedis({
    host: REDIS_HOST,
    port: REDIS_PORT,
});

connection.on("connect" , () => {
    console.log("Redis connected successfully");
});

export const reminderQueue = new Queue("reminderQueue" , {connection});

