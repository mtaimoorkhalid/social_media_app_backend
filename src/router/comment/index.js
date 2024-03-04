import { Router } from "express";
import CommentController from "../../controller/comment/index.js";
import CommentValidator from "../../validator/comment/index.js";
import AuthenticateMiddleware from "../../middelwares/authentication.js";
const CommentRouter = Router();
CommentRouter.get("/comment", AuthenticateMiddleware, CommentController.get);
CommentRouter.post(
  "/comment",
  AuthenticateMiddleware,
  CommentValidator.create,
  CommentController.create
);
CommentRouter.put(
  "/comment/:commentId",
  AuthenticateMiddleware,
  CommentValidator.update,
  CommentController.update
);
CommentRouter.delete(
  "/comment/:commentId",
  AuthenticateMiddleware,
  CommentController.delete
);
// CommentRouter.delete("/comment", CommentController.deleteAll);
export default CommentRouter;
