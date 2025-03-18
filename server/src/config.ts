import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT as string,
    HOST: process.env.HOST as string,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD as string,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS as string,
    EMAIL_VALIDATION_URL: process.env.EMAIL_VALIDATION_URL as string,
};
