"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const category_entity_1 = __importDefault(require("./category.entity"));
const Products = db_config_1.default.define("products", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    isDelete: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});
Products.belongsTo(category_entity_1.default, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
category_entity_1.default.hasMany(Products, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
exports.default = Products;
