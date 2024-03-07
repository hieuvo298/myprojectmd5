"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_entity_1 = __importDefault(require("./admin.entity"));
const category_entity_1 = __importDefault(require("./category.entity"));
const favorite_entity_1 = __importDefault(require("./favorite.entity"));
const products_entity_1 = __importDefault(require("./products.entity"));
const rate_entity_1 = __importDefault(require("./rate.entity"));
const sizes_entity_1 = __importDefault(require("./sizes.entity"));
const user_entity_1 = __importDefault(require("./user.entity"));
const userInfo_entity_1 = __importDefault(require("./userInfo.entity"));
const payment_entity_1 = __importDefault(require("./payment.entity"));
const orderItem_1 = __importDefault(require("./orderItem"));
const createTable = () => {
    user_entity_1.default.sync().then(() => {
        console.log("user created");
    });
    category_entity_1.default.sync().then(() => {
        console.log("category created");
    });
    products_entity_1.default.sync().then(() => {
        console.log("products created");
    });
    admin_entity_1.default.sync().then(() => {
        console.log("admin created");
    });
    userInfo_entity_1.default.sync().then(() => {
        console.log("user info created");
    });
    payment_entity_1.default.sync().then(() => {
        console.log("Payment created");
    });
    orderItem_1.default.sync().then(() => {
        console.log("orderItem created");
    });
    sizes_entity_1.default.sync().then(() => {
        console.log("product size created");
    });
    favorite_entity_1.default.sync().then(() => {
        console.log("favorite created");
    });
    rate_entity_1.default.sync().then(() => {
        console.log("rate and comment created");
    });
};
exports.default = createTable;
