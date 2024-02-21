import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import UserModel from "../user/index.js";

const PostModel = sequelize.define(
  "Post",
  {
    title: { type: DataTypes.STRING(50) },
    description: DataTypes.STRING(1000),
  },
  {}
);
UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);
export default PostModel;
