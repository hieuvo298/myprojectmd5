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
const payment_repository_1 = __importDefault(require("../repositories/payment.repository"));
const orderItem_service_1 = __importDefault(require("./orderItem.service"));
const products_service_1 = __importDefault(require("./products.service"));
const productService = new products_service_1.default;
const orderItemService = new orderItem_service_1.default;
class paymentService {
    constructor() {
        this.paymentRepository = new payment_repository_1.default();
    }
    createPayment(payment, codePayment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.paymentRepository.createPayment(payment);
                // const orderData= await orderItemService.getAllOrdersByUserId(payment.userId);
                // const quantity = orderData[0].map((e:any)=>{
                //   return {
                //     id:e.productId,
                //     quantity:e.quantity,
                //   }
                // })
                // console.log(orderData);
                // const arrId:number[]=[]
                // orderData[0].forEach((item:any )=> {
                //   arrId.push(item.productId)
                // });
                // const arrProducts= await productService.getProductByIds(arrId)
                // const newStock:any =[]
                // arrProducts.forEach((item:any )=>{
                //   quantity.forEach((e:any)=>{
                //     if(item.id == e.id){
                //       newStock.push({
                //         id:item.id,
                //         stock: item.stock - e.quantity
                //       })
                //     }
                //   })
                // });
                // console.log();
                // const newOrderItem:any=orderData[0].map((item:any)=>{
                //   return {
                //     ...item,
                //     codePayment:codePayment,
                //     isPayment:2
                //   }
                // })
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updatePayment(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentRepository.updatePayment(id, status);
        });
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentRepository.getAllPayments();
        });
    }
    getPaymentsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentRepository.getPaymentsByUserId(userId);
        });
    }
}
exports.default = paymentService;
