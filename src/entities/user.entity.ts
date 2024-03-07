import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import userInfo from "./userInfo.entity";

const User = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/dv9tkz5pa/image/upload/f_auto,q_auto/v1/myImages/u4ooiqp9pu9rgwzrmoxl",
    },
  },
  {
    timestamps: true,
  }
);

export default User;
