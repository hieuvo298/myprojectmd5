"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderItem_repository_1 = __importDefault(require("../repositories/orderItem.repository"));
const products_service_1 = __importDefault(require("./products.service"));
const productService = new products_service_1.default();
class OrderItemService {
    constructor() {
        this.orderItemRepository = new orderItem_repository_1.default();
    }
    addOrderItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productService.getProductById(data.productId);
            if (product) {
                const orderItem = {
                    userId: data.userId,
                    productId: data.productId,
                    quantity: data.quantity,
                    sizeNumber: data.sizeNumber,
                    productName: product.dataValues.productName,
                    productImage: product.dataValues.productImage,
                    price: product.dataValues.price,
                    totalPrice: data.quantity * product.dataValues.price,
                };
                yield this.orderItemRepository.addOrderItem(orderItem);
            }
            else {
                throw new Error("Product not found");
            }
        });
    }
    removeOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderItemRepository.deleteOrderItem(id);
        });
    }
    getAllOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderItemRepository.getAllOrdersByUserId(userId);
        });
    }
    updateIsPayment(orderItemId, isPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderItemRepository.updateIsPayment(orderItemId, isPayment);
        });
    }
}
exports.default = OrderItemService;
