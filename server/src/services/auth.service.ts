import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../db/user.model';
import BadRequestError from '../types/errors';
import { AuthDetails } from '../types/auth.request';
dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY as string;

export const valitadeToken = (token: string): AuthDetails => {
    const jwtPayload = jwt.verify(token, secret_key) as any;

    const authDetails: AuthDetails = {
        userId: jwtPayload['userId'],
        username: jwtPayload['username'],
        email: jwtPayload['email'],
        role: jwtPayload['role'],
    }
    return authDetails
}


export const createToken = async (
    email: string,
    password: string,
): Promise<string> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new BadRequestError({
            code: 400,
            message: 'No user with email',
            logging: true,
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new BadRequestError({
            code: 400,
            message: 'Wrong password!',
            logging: false,
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        },
        secret_key,
        {
            expiresIn: '24h',
        },
    );
    if (!token) {
        throw new BadRequestError({
            code: 400,
            message: 'Could not create token',
            logging: true,
        });
    }
    return token;
};

