import { Router } from "express";
import PostRouter from "./post/index.js";
import UserRouter from "./user/index.js";
import CommentRouter from "./comment/index.js";
import AuthRouter from "./auth/index.js";
import WrongApiRouter from "./wrong_api/index.js";
const allRouters = Router();
allRouters.use(PostRouter);
allRouters.use(UserRouter);
allRouters.use(CommentRouter);
allRouters.use(AuthRouter);
allRouters.use(WrongApiRouter);

export default allRouters;
