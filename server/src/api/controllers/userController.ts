import { RequestHandler } from "express";
import nodemailer from "nodemailer";

import { CreateUser } from "@/@types/userTypes";
import { CreateUserSchema } from "@/utils/validationSchema";
import UserModel from "#/models/UserModel";
import { MAILTRAP_PASS, MAILTRAP_USER } from "@/utils/variables";
import { generateToken } from "@/utils/helper";
import EmailVerificationTokenModel from "../models/EmailVerificationTokenModel";
import { sendVerificationMail } from "@/utils/mail";

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { name, email, password } = req.body;
  CreateUserSchema.validate({ name, email, password }).catch((error) => {
    console.log("Error: ", error?.message);
  });
  const user = await UserModel.create({ name, email, password });

  const token = generateToken();
  sendVerificationMail(token, { name, email, userId: user._id.toString() });

  res
    .status(201)
    .json({
      message: "User successfully created!",
      user: { id: user._id, name, email },
    });
};
