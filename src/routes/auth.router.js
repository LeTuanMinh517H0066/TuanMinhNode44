import express  from "express";
import { register, login, loginFacebook,extendToken, loginAsyncKey, verifyAccessTokenAsyncKey } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login); // login bằng khoá đối xứng
authRouter.post("/login-face", loginFacebook);
authRouter.post("/extend-token", extendToken);
authRouter.post("/login-async-key",loginAsyncKey); // login bằng khoá bắt đối xứng  
authRouter.get("/verify-token-async-key", verifyAccessTokenAsyncKey);

export default authRouter;