import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import userInfo from "./userInfo.entity";
import Category from "./category.entity";

const Products = sequelize.define(
  "products",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);
Products.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Category.hasMany(Products, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
export default Products;
