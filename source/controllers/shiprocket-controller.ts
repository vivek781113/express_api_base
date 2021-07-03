import { Request, Response } from 'express';
import logging from '../config/logging';
import User from '../dto/user';
import shiprocketApi from '../services/shiprocket-api';

const NAMESPACE = 'ShiprocketController';

class ShiprocketController {
    async authToken(req: Request, res: Response) {
        logging.info(NAMESPACE, 'Entry authToken()');
        try {
            const user = req.body as User;
            const { token } = await shiprocketApi.login(user);
            logging.info(NAMESPACE, 'Exit authToken()');
            return res.status(200).json({
                token
            });

        }
        catch (error) {
            logging.error(NAMESPACE, 'Error in getting auth token', error);
            return res.json({
                msg: 'fail to create todo',
                status: 500,
                route: '/create'
            });
        }

    }

    async createAdhocOrder(req: Request, res: Response) {

    }
}

export default new ShiprocketController();