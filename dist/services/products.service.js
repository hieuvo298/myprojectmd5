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
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
class ProductService {
    constructor() {
        this.productRepository = new product_repository_1.default();
    }
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.createProduct(newProduct);
        });
    }
    updateProduct(formUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.updateProduct(formUpdate, id);
        });
    }
    softDeleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.softDeleteProduct(id);
        });
    }
    returnProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.returnProduct(id);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProductById(id);
        });
    }
    getProductsByCategory(category, page, pageSize, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProductsByCategory(category, page, pageSize, sortBy);
        });
    }
    getAllProduct(page, pageSize, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getAllProduct(page, pageSize, sortBy);
        });
    }
    getProductByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProductByIds(ids);
        });
    }
    getAllProductAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getAllProductAdmin();
        });
    }
    searchProductByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.searchProductByName(name);
        });
    }
}
exports.default = ProductService;
