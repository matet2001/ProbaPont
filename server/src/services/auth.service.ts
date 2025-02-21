import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../db/user.model";
import BadRequestError from "../types/errors";
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY as string;

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
//
//export const createUserWithEmailVerification = async (
//    email: string,
//    username: string,
//    password: string,
//) => {
//    const user = await createUser(username, email, password);
//    const emailValidation = new EmailValidationModel({
//        userId: user.id,
//    });
//    const savedEmailValidation = await emailValidation.save();
//    await sendConfirmationEmail(
//        email,
//        `http://0.0.0.0:8080/email-validation/${savedEmailValidation._id}`,
//    );
//    return {
//        username: user.username,
//        email: user.email,
//    };
//};
