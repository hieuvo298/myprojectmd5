"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.sendStatus(401);
        }
        const tokenParts = authHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.sendStatus(401);
        }
        const token = tokenParts[1];
        jsonwebtoken_1.default.verify(token, String(process.env.secretKey), (err, user) => {
            if (err) {
                return res.status(401).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(400).json("Request failed");
    }
};
exports.default = authMiddleware;
