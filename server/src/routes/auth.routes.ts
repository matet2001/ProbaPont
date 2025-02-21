import express, { NextFunction, Request, Response } from "express";
import { createEmailValidation, createToken } from "../services/auth.service";
import { createUser } from "../services/user.service";

const router = express.Router();

router.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;
            const user = await createUser(username, email, password);
            const validation = await createEmailValidation(user.id, user.email);
            console.log(validation);

            res.status(201).send({
                data: { username: user.username, email: user.email },
            });
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
