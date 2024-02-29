import { Router } from "express";
import UserController from "../../controller/user/index.js";
import UserValidator from "../../validator/user/index.js";
import AuthenticateMiddleware from "../../middelwares/authentication.js";
const UserRouter = Router();
UserRouter.get("/user", UserController.get);
UserRouter.get("/user/profile", AuthenticateMiddleware, UserController.getOne);
UserRouter.put("/user/:userId", UserValidator.update, UserController.update);
UserRouter.delete("/post/:userId", UserController.delete);
UserRouter.delete("/post", UserController.deleteAll);
UserRouter.post("/user/follower", UserController.follow);
UserRouter.get("/user/follower/:id", UserController.getFollowerById);

export default UserRouter;
