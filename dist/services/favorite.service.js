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
const favorite_repository_1 = __importDefault(require("../repositories/favorite.repository"));
const products_service_1 = __importDefault(require("./products.service"));
const productService = new products_service_1.default();
class FavoriteService {
    constructor() {
        this.favoriteRepository = new favorite_repository_1.default();
    }
    getAllFavorite() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.favoriteRepository.getAllFavorite();
        });
    }
    getFavoriteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.favoriteRepository.getFavoriteById(userId);
            return data;
        });
    }
    createFavorite(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productService.getProductById(data.productId);
            if (product) {
                const newFavorite = {
                    userId: data.userId,
                    productId: data.productId,
                    productName: product.dataValues.productName,
                    productImage: product.dataValues.productImage,
                };
                console.log(newFavorite);
                yield this.favoriteRepository.createFavorite(newFavorite);
            }
        });
    }
    deleteFavoriteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.favoriteRepository.deleteFavoriteById(id);
            return data;
        });
    }
}
exports.default = FavoriteService;
