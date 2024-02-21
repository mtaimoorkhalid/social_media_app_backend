import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import UserModel from "../user/index.js";
import PostModel from "../post/index.js";

const CommentModel = sequelize.define(
  "Comment",
  {
    description: DataTypes.STRING(1000),
  },
  {}
);
UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel);
PostModel.hasMany(CommentModel);
CommentModel.belongsTo(PostModel);

export default CommentModel;
