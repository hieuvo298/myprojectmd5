import { NextFunction, Request, Response } from "express";

const checkRole = (req: any, res: Response, next: NextFunction) => {
    if(req.user.role == 1) {
        next()
    }else {
        res.status(403).json('Forbiden')
    }
}
export default checkRole