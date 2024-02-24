import sequelize from "../../db/config.js";
import UserModel from "./index.js";

const UserFollwerModel = sequelize.define("UserFollower", {});
UserFollwerModel.belongsTo(UserModel, { as: "follower" });
UserFollwerModel.belongsTo(UserModel, { as: "following" });

UserModel.belongsToMany(UserModel, {
  through: UserFollwerModel,
  as: "followers",
  foreignKey: "followingId",
});
UserModel.belongsToMany(UserModel, {
  through: UserFollwerModel,
  as: "followings",
  foreignKey: "followerId",
});

export default UserFollwerModel;
