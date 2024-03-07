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
const payment_entity_1 = __importDefault(require("../entities/payment.entity"));
class PaymentRepository {
    createPayment(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield payment_entity_1.default.create(payment);
        });
    }
    updatePayment(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_entity_1.default.update({ status: status }, { where: { id: id } });
        });
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_entity_1.default.findAll();
        });
    }
    getPaymentsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_entity_1.default.findAll({ where: { userId: userId } });
        });
    }
}
exports.default = PaymentRepository;
