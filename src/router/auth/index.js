import { Router } from "express";
import AuthController from "../../controller/auth/index.js";
import UserValidator from "../../validator/user/index.js";

const AuthRouter = Router();
AuthRouter.post("/login", UserValidator.login, AuthController.login);
AuthRouter.post("/register", UserValidator.register, AuthController.register);
AuthRouter.post("/logout", AuthController.logout);

export default AuthRouter;
