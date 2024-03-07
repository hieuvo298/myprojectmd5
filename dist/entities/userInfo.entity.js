"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const user_entity_1 = __importDefault(require("./user.entity"));
const userInfo = db_config_1.default.define("userInfo", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/dv9tkz5pa/image/upload/f_auto,q_auto/v1/myImages/u4ooiqp9pu9rgwzrmoxl",
    },
    gender: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
}, {
    timestamps: true,
});
user_entity_1.default.hasOne(userInfo, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
userInfo.belongsTo(user_entity_1.default, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
exports.default = userInfo;
