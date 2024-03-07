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
const favorite_service_1 = __importDefault(require("../services/favorite.service"));
const favoriteController = express_1.default.Router();
const favoriteService = new favorite_service_1.default();
favoriteController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favoriteService.getAllFavorite();
    res.status(200).json(result);
}));
favoriteController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield favoriteService.getFavoriteByUserId(id);
    res.status(200).json(result);
}));
favoriteController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFavorite = {
            userId: req.body.userId,
            productId: req.body.productId,
        };
        console.log(newFavorite);
        yield favoriteService.createFavorite(newFavorite);
        res.status(201).json({ msg: "Create ratting successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra " });
        console.log(error);
    }
}));
favoriteController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield favoriteService.deleteFavoriteById(id);
        if (!result) {
            res.status(404).json({ msg: "not found" });
        }
        else {
            res.status(201).json({ msg: "Delete successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
    }
}));
exports.default = favoriteController;
