"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRole = (req, res, next) => {
    if (req.user.role == 1) {
        next();
    }
    else {
        res.status(403).json('Forbiden');
    }
};
exports.default = checkRole;
