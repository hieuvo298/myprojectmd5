"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importStar(require("express"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const entities_1 = __importDefault(require("./entities"));
const routers_1 = __importDefault(require("./routers"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require("cors");
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((0, express_1.urlencoded)());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
}));
app.use((0, express_session_1.default)({
    secret: String(process.env.secretKey),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
db_config_1.default.authenticate();
(0, entities_1.default)();
(0, routers_1.default)(app);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
