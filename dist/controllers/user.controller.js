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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const multer_cloudinary_1 = __importDefault(require("../configs/multer.cloudinary"));
const checkUser_1 = __importDefault(require("../middlewares/checkUser"));
const user_service_1 = __importDefault(require("../services/user.service"));
const express_validator_1 = require("express-validator");
const usersController = express_1.default.Router();
const userService = new user_service_1.default();
usersController.post("/register", [(0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 6 })], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashPass = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = {
            userName: req.body.userName,
            email: req.body.email,
            password: hashPass,
        };
        console.log(newUser);
        yield userService.register(newUser);
        res.status(201).json({ msg: "create successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "email is already exist" });
    }
}));
usersController.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginForm = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = yield userService.login(loginForm);
        if (result == 1) {
            res.status(400).json({ msg: "Email wrong" });
        }
        else if (result == 2) {
            res.status(400).json({ msg: "Password wrong" });
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(400).json({ msg: "login failed" });
    }
}));
usersController
    .patch("/update/:id", checkUser_1.default, multer_cloudinary_1.default.single("myImages"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        let updateUser;
        if (req.file) {
            updateUser = Object.assign(Object.assign({}, req.body), { avatar: req.file.path });
        }
        else {
            updateUser = Object.assign({}, req.body);
        }
        yield userService.updateUser(updateUser, id);
        res.status(200).json({ msg: "updated" });
    }
    catch (error) {
        res.status(400).json({ msg: "update failed" });
    }
}))
    .get("/get-all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userService.getAll();
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(400).json({ msg: "get failed" });
    }
}));
usersController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const user = yield userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ msg: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
exports.default = usersController;
