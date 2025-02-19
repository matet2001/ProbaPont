import bcrypt from "bcrypt";
import BadRequestError from "../types/errors";
import { UserModel } from "../db/user.model";
import { Types } from "mongoose";

export const createUser = async (
    username: string,
    email: string,
    password: string,
) => {
    if (!username || !email || !password) {
        throw new BadRequestError({
            message: 'Missing required field',
        });
    }
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
        throw new BadRequestError({
            message: 'Username is already taken',
            code: 400,
            logging: true,
        });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        throw new BadRequestError({
            message: 'Email is already taken',
            code: 400,
            logging: true,
        });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
        username,
        email,
        password: hashedPassword,
    });
    const savedUser = await user.save();

    return {
        username: savedUser.username,
        email: savedUser.email,
    };
};

export const getUserById = async (userId: Types.ObjectId | undefined) => {
    if (!userId) {
        throw new BadRequestError({
            message: 'Unauthorized',
            code: 401,
            logging: false
        })

    }

    const user = await UserModel.findById(userId);
    if (!user) {
        throw new BadRequestError({
            message: 'No user found',
            code: 404,
            logging: true,
        });
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };
};

