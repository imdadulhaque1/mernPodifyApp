import { Model, ObjectId, Schema, model } from "mongoose";

// TS interface
interface EmailVerificationInterface {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

const emailVerificationTokenSchema = new Schema<EmailVerificationInterface>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: new Date(),
  },
});

export default model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
) as Model<EmailVerificationInterface>;
