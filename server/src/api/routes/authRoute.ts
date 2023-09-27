import { Router } from "express";

import { CreateUserSchema } from "@/utils/validationSchema";
import { validate } from "@/middleware/validator";
import { createUser } from "../controllers/userController";

const router = Router();

router.post("/create", validate(CreateUserSchema), createUser);

export default router;
