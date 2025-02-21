import mongoose, { Document, Schema, Types } from "mongoose";

interface IEmailValidation extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    createdAt: Date;
    expiresAt: string;
}

const EmailValidationSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: {
            type: String,
            default: "Kaki",
            index: { expires: "1h" },
        },
    },
    { timestamps: true },
);

const EmailValidationModel = mongoose.model<IEmailValidation>(
    "EmailValidation",
    EmailValidationSchema,
);

export { EmailValidationModel, IEmailValidation };
