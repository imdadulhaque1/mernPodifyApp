import { CreateUser } from "@/@types/userTypes";
import { CreateUserSchema } from "@/utils/validationSchema";
import UserModel from "#/models/UserModel";
import { RequestHandler } from "express";

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { name, email, password } = req.body;
  CreateUserSchema.validate({ name, email, password }).catch((error) => {
    console.log("Error: ", error?.message);
  });
  const user = await UserModel.create({ name, email, password });
  res.status(201).json({ message: "User successfully created!", user });
};
