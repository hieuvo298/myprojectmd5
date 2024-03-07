"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize("btq6w1wdtycuv9ftwqxy", "uwe4rcsmmjuzdmdx", "vg9wJZr2a6q8BsLHTTNP", {
    host: "btq6w1wdtycuv9ftwqxy-mysql.services.clever-cloud.com",
    dialect: "mysql",
});
exports.default = sequelize;
