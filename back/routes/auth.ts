import { Router } from "express";
import { AuthControllers } from "../controllers/auth";
import { ApiRoutes } from "../types";
// import { signIn, signUp } from "../controllers/auth";

export const authRouter = Router();

authRouter.post(ApiRoutes.postSignUp({}), AuthControllers.postSignUp);
authRouter.post(ApiRoutes.postSignIn({}), AuthControllers.postSignIn);
