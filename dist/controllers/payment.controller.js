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
const payment_service_1 = __importDefault(require("../services/payment.service"));
const uuid_1 = require("uuid");
const paymentController = express_1.default.Router();
const paymentService = new payment_service_1.default();
paymentController.post('/create/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const codePayment = (0, uuid_1.v4)();
        const data = {
            userId,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            paymentMethod: req.body.paymentMethod,
            codePayment,
            subTotal: Number(req.body.subTotal),
        };
        console.log(data);
        yield paymentService.createPayment(data, codePayment);
        res.status(200).json("payment created successfully");
    }
    catch (error) {
        console.log(error);
        res.status(500).json("payment error");
    }
}));
paymentController.patch('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const status = req.body.status;
        const result = yield paymentService.updatePayment(id, status);
        if (result[0] === 0) {
            res.status(400).json('not found');
        }
        else {
            res.status(200).json('updated status successfully');
        }
    }
    catch (error) {
        res.status(500).json('internal server error');
    }
}));
paymentController.get('/get-by-id/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const data = yield paymentService.getPaymentsByUserId(userId);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json('internal server error');
    }
}));
paymentController.get('/get-all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield paymentService.getAllPayments();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json('internal server error');
    }
}));
exports.default = paymentController;
