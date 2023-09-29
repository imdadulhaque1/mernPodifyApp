import { compare, hash } from "bcrypt";
import { Model, ObjectId, Schema, model } from "mongoose";

// TS interface
interface EmailVerificationInterface {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}
interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  EmailVerificationInterface,
  {},
  Methods
>({
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

emailVerificationTokenSchema.pre("save", async function (next) {
  // Generate the hash of the existing token
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

// Compare of the existing token and the entered token
emailVerificationTokenSchema.methods.compareToken = async function (token) {
  const comparedResult = await compare(token, this.token);

  return comparedResult;
};

export default model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
) as Model<EmailVerificationInterface, {}, Methods>;
