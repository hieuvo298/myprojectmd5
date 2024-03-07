"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const orderItem_controller_1 = __importDefault(require("../controllers/orderItem.controller"));
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const rating_controller_1 = __importDefault(require("../controllers/rating.controller"));
const favorite_controller_1 = __importDefault(require("../controllers/favorite.controller"));
const myRouter = (app) => {
    app.use('/users', user_controller_1.default);
    app.use('/products', product_controller_1.default);
    app.use('/order', orderItem_controller_1.default);
    app.use('/payment', payment_controller_1.default);
    app.use('/rating', rating_controller_1.default);
    app.use('/favorites', favorite_controller_1.default);
};
exports.default = myRouter;
