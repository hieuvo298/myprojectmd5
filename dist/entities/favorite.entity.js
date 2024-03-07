"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const user_entity_1 = __importDefault(require("./user.entity"));
const products_entity_1 = __importDefault(require("./products.entity"));
const Favorite = db_config_1.default.define("Favorite", {
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
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});
user_entity_1.default.hasMany(Favorite, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Favorite.belongsTo(user_entity_1.default, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
products_entity_1.default.hasMany(Favorite, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Favorite.belongsTo(products_entity_1.default, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
exports.default = Favorite;
