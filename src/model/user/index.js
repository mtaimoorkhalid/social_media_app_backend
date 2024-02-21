import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(50) },
    password: { type: DataTypes.STRING(50) },
  },
  {}
);
export default UserModel;
