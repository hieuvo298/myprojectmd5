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
const express_1 = __importDefault(require("express"));
const orderItem_service_1 = __importDefault(require("../services/orderItem.service"));
const orderItemService = new orderItem_service_1.default();
const orderItemController = express_1.default.Router();
orderItemController.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderItem = {
            productId: Number(req.body.productId),
            userId: Number(req.body.userId),
            quantity: Number(req.body.quantity),
            sizeNumber: Number(req.body.sizeNumber),
        };
        yield orderItemService.addOrderItem(newOrderItem);
        res.status(201).json({ msg: "Order item added successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
orderItemController.get("/get-all/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const orders = yield orderItemService.getAllOrdersByUserId(userId);
        // console.log(orders);
        res.status(200).json({ data: orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
orderItemController.delete("/remove/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItemId = Number(req.params.id);
        yield orderItemService.removeOrderItem(orderItemId);
        res.status(200).json({ msg: "Order item removed successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
orderItemController.patch("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItemId = Number(req.params.id);
        const isPayment = Number(req.body.isPayment);
        yield orderItemService.updateIsPayment(orderItemId, isPayment);
        res.status(200).json({ msg: "Payment status updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
exports.default = orderItemController;
