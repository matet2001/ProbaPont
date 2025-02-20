import express, { NextFunction, Request, Response } from "express";
import { createUser } from "../services/user.service";
import { createToken } from "../services/auth.service";
import { sendConfirmationEmail } from "../services/email.service";
import { Types } from "mongoose";
import { randomUUID } from "node:crypto";
const { EMAIL_VALIDATION_URL } = process.env;

const router = express.Router();

router.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;
            const user = await createUser(username, email, password);
            const validationToken = randomUUID().toString();

            const url = EMAIL_VALIDATION_URL as string;
            await sendConfirmationEmail(
                user.email,
                `${url}/${validationToken}`,
            );

            res.status(201).send({ data: user });
        } catch (err) {
            next(err);
        }
    },
);

router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { email, password } = req.body;
            const token = await createToken(email, password);

            res.status(200).json({ data: token });
        } catch (err) {
            next(err);
        }
    },
);

export default router;
