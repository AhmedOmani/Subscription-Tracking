import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { PORT , NODE_ENV , DB_URI , JWT_SECRET , JWT_EXPIRES_IN , ARJECT_KEY , ARJECT_ENV , REDIS_HOST , REDIS_PORT , SERVER_URL , EMAIL_HOST , EMAIL_PORT , EMAIL_USER , EMAIL_PASSWORD } = process.env