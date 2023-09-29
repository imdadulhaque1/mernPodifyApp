import { RequestHandler } from "express";
import nodemailer from "nodemailer";

import { CreateUser } from "@/@types/userTypes";
import { CreateUserSchema } from "@/utils/validationSchema";
import UserModel from "#/models/UserModel";
import { MAILTRAP_PASS, MAILTRAP_USER } from "@/utils/variables";
import { generateToken } from "@/utils/helper";
import EmailVerificationTokenModel from "../models/EmailVerificationTokenModel";

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { name, email, password } = req.body;
  CreateUserSchema.validate({ name, email, password }).catch((error) => {
    console.log("Error: ", error?.message);
  });
  const user = await UserModel.create({ name, email, password });

  // Send Verification Email
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  const token = generateToken();
  await EmailVerificationTokenModel.create({
    owner: user._id,
    token,
  });

  transport.sendMail({
    to: user.email,
    from: "imdadulhaque1440@gmail.com",
    html: `<h1>Your verification token is ${token}</h1>`,
  });

  res.status(201).json({ message: "User successfully created!", user });
};
