import mongoose, { Document, Schema, Date, Types } from 'mongoose';

enum UserRole {
    ADMIN = 'admin',
    HOST = 'host',
    USER = 'user',
}

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date;
    updated_at?: Date;
}

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export { UserModel, IUser, UserRole };
