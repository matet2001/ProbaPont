import { Types } from "mongoose";
import nodemailer from "nodemailer";
import { EmailValidationModel } from "../db/email-validation.model";
import BadRequestError from "../types/errors";
import { UserModel } from "../db/user.model";
import dotenv from "dotenv";
dotenv.config();

const { GMAIL_APP_PASSWORD, GMAIL_ADDRESS } = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_ADDRESS as string,
        pass: GMAIL_APP_PASSWORD as string,
    },
});

export const sendConfirmationEmail = async (
    to: string,
    confirmationLink: string,
) => {
    const mailOptions = {
        from: GMAIL_ADDRESS as string,
        to,
        subject: "Confirm Your Registration on ProbaPont.git",
        html: `<p>Please click the link below to confirm your registration to ProbaPont.git</p>
           <a href="${confirmationLink}">${confirmationLink}</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export const verifyUserEmail = async (verificationId: Types.ObjectId) => {
    const emailValidation = await EmailValidationModel.findById(verificationId);
    if (!emailValidation) {
        throw new BadRequestError({ code: 401, message: "Expired token!" });
    }
    const userId = emailValidation.userId;
    const user = await UserModel.findByIdAndUpdate(
        { _id: userId },
        {
            isVerified: true,
            updatedAt: Date.now(),
        },
        { new: true },
    );
    if (!user) {
        throw new BadRequestError({ code: 404, message: "No user found!" });
    }
    return {
        username: user.username,
        email: user.email,
        success: user.isVerified,
    };
};
