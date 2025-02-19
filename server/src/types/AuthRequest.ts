import { Request } from 'express';
import { Types } from 'mongoose';
import { UserRole } from '../db/user.model';

export interface AuthRequest extends Request {
    userId?: Types.ObjectId;
    username?: string;
    email?: string;
    role?: UserRole;
}
