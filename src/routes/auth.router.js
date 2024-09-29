import express  from "express";
import { register, login, loginFacebook } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/login-face", loginFacebook)

export default authRouter;