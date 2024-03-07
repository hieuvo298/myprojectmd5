import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.entity";

const userInfo = sequelize.define(
  "userInfo",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/dv9tkz5pa/image/upload/f_auto,q_auto/v1/myImages/u4ooiqp9pu9rgwzrmoxl",
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
User.hasOne(userInfo, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
userInfo.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default userInfo;
