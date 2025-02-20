import mongoose, { Document, Schema, Types } from "mongoose";

interface IEmailValidation extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
    expiresAt: Date;
}

const EmailValidationSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 60 * 60 * 1000),
            index: { expires: "1h" },
        },
    },
    { timestamps: true },
);

const EmailValidation = mongoose.model<IEmailValidation>(
    "EmailValidation",
    EmailValidationSchema,
);

export default EmailValidation;
