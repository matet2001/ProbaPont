import mongoose, { Document, Schema, Date, Types } from "mongoose";

enum UserRole {
    ADMIN = "admin",
    HOST = "host",
    USER = "user",
}

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export { UserModel, IUser, UserRole };
