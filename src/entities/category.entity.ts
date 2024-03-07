import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import userInfo from "./userInfo.entity";

const Category = sequelize.define(
  "category",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
