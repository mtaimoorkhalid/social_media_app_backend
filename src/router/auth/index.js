import AuthController from "../../controller/auth/index.js";
import { Router } from "express";
const AuthRouter = Router();
AuthRouter.post("/auth", AuthController.login);

export default AuthRouter;
