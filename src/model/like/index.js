import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import UserModel from "../user/index.js";
import PostModel from "../post/index.js";

const LikeModel = sequelize.define(
  "Like",
  {
    count: DataTypes.STRING(),
  },
  {}
);
UserModel.hasOne(LikeModel);
LikeModel.belongsTo(UserModel);
PostModel.hasMany(LikeModel);
LikeModel.belongsTo(PostModel);

export default LikeModel;
