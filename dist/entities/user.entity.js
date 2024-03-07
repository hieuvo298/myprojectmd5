"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const User = db_config_1.default.define("User", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/dv9tkz5pa/image/upload/f_auto,q_auto/v1/myImages/u4ooiqp9pu9rgwzrmoxl",
    },
}, {
    timestamps: true,
});
exports.default = User;
