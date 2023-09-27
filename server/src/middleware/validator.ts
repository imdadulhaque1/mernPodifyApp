import { RequestHandler } from "express";
import * as yup from "yup";

export const validate = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    !req.body && res.status(422).json({ error: "Empty body is not expected!" });
    const schemaToValidate = yup.object({ body: schema });
    try {
      await schemaToValidate.validate({ body: req.body }, { abortEarly: true });
      next();
    } catch (error) {
      error instanceof yup.ValidationError &&
        res.status(422).json({ error: error?.message });
    }
  };
};