import { Router } from "express";
import UserController from "../../controller/user/index.js";
import UserValidator from "../../validator/user/index.js";
import AuthenticateMiddleware from "../../middelwares/authentication.js";
const UserRouter = Router();
UserRouter.get(
  "/user/profile",
  AuthenticateMiddleware,
  UserController.getProfile
);
UserRouter.get("/user", UserController.get);
// UserRouter.get("/user/profile", AuthenticateMiddleware, UserController.getOne);
UserRouter.put(
  "/user/update",
  AuthenticateMiddleware,
  UserValidator.update,
  UserController.update
);
UserRouter.delete(
  "/post/delete",
  AuthenticateMiddleware,
  UserController.delete
);
// UserRouter.delete("/post", UserController.deleteAll);

UserRouter.get(
  "/user/getfollowers",
  AuthenticateMiddleware,
  UserController.getFollower
);

UserRouter.get(
  "/user/getfollowings",
  AuthenticateMiddleware,
  UserController.getFollowing
);
UserRouter.post("/user/follow", AuthenticateMiddleware, UserController.follow);

UserRouter.delete(
  "/user/unfollow",
  AuthenticateMiddleware,
  UserController.unfollow
);
UserRouter.delete(
  "/user/removeFollower",
  AuthenticateMiddleware,
  UserController.removeFollower
);

export default UserRouter;
