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
const products_service_1 = __importDefault(require("../services/products.service"));
const multer_cloudinary_1 = __importDefault(require("../configs/multer.cloudinary"));
const productController = express_1.default.Router();
const productService = new products_service_1.default();
productController.post("/create", multer_cloudinary_1.default.single("productImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imgProduct = req.file;
        const newProduct = {
            categoryId: req.body.categoryId,
            productName: req.body.productName,
            productImage: imgProduct.path,
            description: req.body.description,
            price: req.body.price,
        };
        yield productService.createProduct(newProduct);
        res.status(201).json({ msg: "Product created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
productController.get("/get-by-ids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.query.ids;
        const products = yield productService.getProductByIds(ids);
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
productController.patch("/update/:id", multer_cloudinary_1.default.single("productImage"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.params.id);
        const imgProduct = req.file;
        const formUpdate = {
            categoryId: req.body.categoryId,
            productName: req.body.productName,
            productImage: imgProduct.path,
            description: req.body.description,
            price: req.body.price,
        };
        yield productService.updateProduct(formUpdate, productId);
        res.status(200).json({ msg: "Product updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
productController.patch("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.params.id);
        yield productService.softDeleteProduct(productId);
        res.status(200).json({ msg: "Product deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
productController.patch("/return/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.params.id);
        yield productService.returnProduct(productId);
        res.status(200).json({ msg: "Product deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
productController.get("/get-all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 6;
        const sortBy = req.query.sortBy;
        const data = yield productService.getAllProduct(page, pageSize, sortBy);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Get failed" });
    }
}));
productController.get("/get-all-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productService.getAllProductAdmin();
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Get failed" });
    }
}));
productController.get("/get-all/sort", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 6;
        const sortBy = req.query.sortBy;
        const data = yield productService.getAllProduct(page, pageSize, sortBy);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Get failed" });
    }
}));
productController.get("/get-by-category/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = Number(req.params.categoryId);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 6;
        const sortBy = req.query.sortBy;
        const data = yield productService.getProductsByCategory(categoryId, page, pageSize, sortBy);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Get by category failed" });
    }
}));
productController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.params.id);
        const product = yield productService.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ msg: "Product not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
productController.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productName = req.query.name;
        const data = yield productService.searchProductByName(productName);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Search failed" });
    }
}));
exports.default = productController;
