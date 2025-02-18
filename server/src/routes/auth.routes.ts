import express, { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/user.service';
import { createToken } from '../services/auth.service';

const router = express.Router();

router.post('/singup',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;
            const user = createUser(username, email, password);

            return res.status(201).send(user);
        } catch (err) {
            next(err)
        }
    }
)

router.post(
    '/login',
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
