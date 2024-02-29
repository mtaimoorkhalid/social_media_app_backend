import { Router } from "express";
import PostController from "../../controller/post/index.js";
import PostValidator from "../../validator/post/index.js";
import AuthenticateMiddleware from "../../middelwares/authentication.js";
const PostRouter = Router();
PostRouter.get("/post", PostController.get);
PostRouter.post(
  "/post",
  PostValidator.create,
  AuthenticateMiddleware,
  PostController.create
);
PostRouter.put("/post/:postId", PostValidator.update, PostController.update);
PostRouter.delete("/post/:postId", PostController.delete);
PostRouter.delete("/post", PostController.deleteAll);
export default PostRouter;
