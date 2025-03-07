import mongoose, { Date, Document, Schema, Types } from "mongoose";

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
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true },
);

const EmailValidationModel = mongoose.model<IEmailValidation>(
    "EmailValidation",
    EmailValidationSchema,
);

export { EmailValidationModel, IEmailValidation };
