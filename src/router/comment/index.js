import { Router } from "express";
import CommentController from "../../controller/comment/index.js";
import CommentValidator from "../../validator/comment/index.js";
import AuthenticateMiddleware from "../../middelwares/authentication.js";
const CommentRouter = Router();
CommentRouter.get("/comment", CommentController.get);
CommentRouter.post(
  "/comment",
  AuthenticateMiddleware,
  CommentValidator.create,
  CommentController.create
);
CommentRouter.put(
  "/comment/:commentId",
  CommentValidator.update,
  CommentController.update
);
CommentRouter.delete("/comment/:commentId", CommentController.delete);
CommentRouter.delete("/comment", CommentController.deleteAll);
// CommentRouter.get("*", CommentController.notFound);
// CommentRouter.post("*", CommentController.notFound);
// CommentRouter.put("*", CommentController.notFound);
// CommentRouter.delete("*", CommentController.notFound);
export default CommentRouter;
