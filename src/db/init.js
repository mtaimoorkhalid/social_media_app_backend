import UserModel from "../model/user/index.js";
import CommentModel from "../model/comment/index.js";
import PostModel from "../model/post/index.js";

const syncDb = async () => {
  await UserModel.sync({ force: false, alter: true });
  console.log("The table for the User model was just (re)created!");
  await PostModel.sync({ force: false, alter: true });
  console.log("The table for the Post model was just (re)created!");
  await CommentModel.sync({ force: false, alter: true });
  console.log("The table for the User model was just (re)created!");
};

export default syncDb;
