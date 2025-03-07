import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../db/user.model";
import BadRequestError from "../types/errors";
import { Types } from "mongoose";
import { EmailValidationModel } from "../db/email-validation.model";
import { sendConfirmationEmail } from "./email.service";
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY as string;
const email_validation_url = process.env.EMAIL_VALIDATION_URL as string;

export const createToken = async (
    email: string,
    password: string,
): Promise<string> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new BadRequestError({
            code: 400,
            message: "No user with email",
            logging: true,
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new BadRequestError({
            code: 400,
            message: "Wrong password!",
            logging: false,
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
            username: user.username,
            email: user.email,
        },
        secret_key,
        {
            expiresIn: "24h",
        },
    );
    if (!token) {
        throw new BadRequestError({
            code: 400,
            message: "Could not create token",
            logging: true,
        });
    }
    return token;
};

export const createEmailValidation = async (
    userId: Types.ObjectId,
    email: string,
) => {
    const oneHourFromNow = new Date().setHours(1);
    const emailValidation = new EmailValidationModel({
        userId,
        expiresAt: oneHourFromNow,
    });
    const savedEmailValidation = await emailValidation.save();
    await sendConfirmationEmail(
        email,
        `${email_validation_url}/email-validation/${savedEmailValidation._id}`,
    );
    return savedEmailValidation;
};
