import { AuthRequest } from '../types/AuthRequest';
import express, { NextFunction, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { getUserById } from '../services/user.service';

const router = express.Router();

router.get(
    '/my-account',
    authenticateToken,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;
            const user = await getUserById(userId)

            res.status(200).send({ user })
        } catch (err) {
            next(err)
        }
    }
)

export default router;

