import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

class Middleware {
    handleValidationError(req: Request, res: Response, next: NextFunction) {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.json(error.array()[0]);
        }
        next();
    }
    auth(req: Request, res: Response, next: NextFunction) {
        const { token } = req.query;
        if (!token) {
            return res.status(401).json({
                'message': 'User not authorized to view this page'
            });
        } else {
            next();
        }
    }
}


export default new Middleware();