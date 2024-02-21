import { Router } from "express";
import PostRouter from "./post/index.js";
import UserRouter from "./user/index.js";
import CommentRouter from "./comment/index.js";
const allRouters = Router();
allRouters.use(PostRouter);
allRouters.use(UserRouter);
allRouters.use(CommentRouter);

export default allRouters;
