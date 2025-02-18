import { Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AuthRequest } from '../types/auth.request';
import { valitadeToken } from '../services/auth.service';

dotenv.config();

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers['authorization'];
    const token: string = (authHeader && authHeader.split(' ')[1]) || '';

    try {
        const authDetails = valitadeToken(token);
        req.auth = authDetails
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized', log: error });
    }
};
