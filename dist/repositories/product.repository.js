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
const products_entity_1 = __importDefault(require("../entities/products.entity"));
const sizes_entity_1 = __importDefault(require("../entities/sizes.entity"));
const sequelize_1 = require("sequelize");
class ProductRepository {
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_entity_1.default.create(newProduct);
        });
    }
    updateProduct(formUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_entity_1.default.update(formUpdate, { where: { id } });
        });
    }
    softDeleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_entity_1.default.update({ isDelete: 1 }, { where: { id, isDelete: 0 } });
        });
    }
    returnProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_entity_1.default.update({ isDelete: 0 }, { where: { id, isDelete: 1 } });
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findOne({
                where: { id, isDelete: 0 },
                include: {
                    model: sizes_entity_1.default,
                },
            });
        });
    }
    getProductByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findAll({
                where: { id: ids, isDelete: 0 },
                include: {
                    model: sizes_entity_1.default,
                },
            });
        });
    }
    getAllProduct(page, pageSize, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * pageSize;
            let order = [];
            if (sortBy === "lowToHigh") {
                order = [["price", "ASC"]];
            }
            else if (sortBy === "highToLow") {
                order = [["price", "DESC"]];
            }
            return yield products_entity_1.default.findAll({
                include: { model: sizes_entity_1.default },
                where: { isDelete: 0 },
                limit: pageSize,
                offset: offset,
                order: order,
            });
        });
    }
    getAllProductAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findAll({
                include: { model: sizes_entity_1.default }
            });
        });
    }
    getProductsByCategory(category, page, pageSize, sortBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * pageSize;
            let order = [];
            if (sortBy == "lowToHigh") {
                order = [["price", "ASC"]];
            }
            else if (sortBy == "highToLow") {
                order = [["price", "DESC"]];
            }
            return yield products_entity_1.default.findAll({
                where: { categoryId: category, isDelete: 0 },
                limit: pageSize,
                offset: offset,
                order: order,
            });
        });
    }
    searchProductByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findAll({
                where: {
                    isDelete: 0,
                    productName: {
                        [sequelize_1.Op.iLike]: `%${name}%`,
                    },
                },
                include: {
                    model: sizes_entity_1.default,
                },
            });
        });
    }
}
exports.default = ProductRepository;
