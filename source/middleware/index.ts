import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
const { EOL } = require('os');
const path = require('path');
const fs = require('fs');

class Middleware {
    handleValidationError(req: Request, res: Response, next: NextFunction) {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.json(error.array()[0]);
        }
        next();
    }
    auth(req: Request, res: Response, next: NextFunction) {
        const { apiKey } = req.query;
        if (!apiKey) {
            return res.status(401).json({
                'message': 'User not authorized to view this page'
            });
        } else {
            const root = path.resolve('./');
            const validKeyPath = `${root}/source/keys/valid-keys.txt`;
            fs.readFile(validKeyPath, 'utf-8', (err: Error, data: any) => {
                if (err) {
                    return res.status(500).json({
                        'message': 'Not able to read keys file'
                    });
                }
                const lines = data.split(EOL);
                if (lines.includes(apiKey)) {
                    next();
                } else {
                    return res.status(401).json({
                        'message': 'User not authorized to view this page'
                    });
                }
            })
        }
    }
}


export default new Middleware();