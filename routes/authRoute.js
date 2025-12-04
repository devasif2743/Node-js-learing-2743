import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  profile,
} from "../controllers/auth/authControllers.js";
import {
  RegisterValidator,
  LoginValidator,
} from "../Validators/registerValidator.js";
import tokenAuth from "../middleware/tokenAuth.js";
export const authRouter = express.Router();

authRouter.post("/register", RegisterValidator, register);
authRouter.post("/login", LoginValidator, login);
authRouter.get("/profile", tokenAuth, profile);
