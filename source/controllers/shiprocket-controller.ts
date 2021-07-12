import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logging from '../config/logging';
import { OrderPayload } from '../dto/order-payload';
import { OrderResponse } from '../dto/order-response';
import { ProductPayload } from '../dto/product-payload';
import User from '../dto/user';
import { ProductInstance } from '../model/product';
import ShiprocketApi from '../services/shiprocket-api';

const NAMESPACE = 'ShiprocketController';

class ShiprocketController {
    async authToken(req: Request, res: Response) {
        logging.info(NAMESPACE, 'Entry authToken()');
        try {
            const shiprocketApi = new ShiprocketApi();
            const user = req.body as User;
            const { token } = await shiprocketApi.login(user);
            logging.info(NAMESPACE, 'Exit authToken()');
            return res.status(200).json({
                token
            });

        }
        catch (error) {
            logging.error(NAMESPACE, 'Error in getting auth token', error);
            return res.status(500).json({
                msg: 'fail to create todo',
                status: 500,
                route: '/create'
            });
        }

    }
    async createProduct(req: Request, res: Response) {
        const { token } = req?.query;
        const payload = req.body as ProductPayload;
        try {
            if (!token)
                return res.status(401).json({
                    msg: 'Authorization denied'
                });
            else if (!payload)
                return res.status(400).json({
                    msg: 'Bad request'
                });
            else {
                const shiprocketApi = new ShiprocketApi(token as string);
                const response = await shiprocketApi.createProduct(payload);
                const id = uuidv4();
                const record = await ProductInstance.create({ ...req.body, id });
                return res.status(201).json({
                    record
                });
            }
        } catch (error) {

            logging.error(NAMESPACE, 'Error in creating product', error.response.data);
            return res.status(500).json({
                msg: `fail to create product with error ${error?.response?.data}`,
                status: 500,
                route: '/createOrder'
            });
        }


    }
    async createAdhocOrder(req: Request, res: Response) {
        const { token } = req?.query;
        const payload = req.body as OrderPayload;
        try {
            if (!token)
                return res.status(401).json({
                    msg: 'Authorization denied'
                });
            else if (!payload)
                return res.status(400).json({
                    msg: 'Bad request'
                });
            else {
                const shiprocketApi = new ShiprocketApi(token as string);
                const orderResponse: OrderResponse = await shiprocketApi.createOrder(payload);

                return res.status(201).json({
                    orderResponse
                });
            }
        } catch (error) {

            logging.error(NAMESPACE, 'Error in creating order', error.response.data);
            return res.status(500).json({
                msg: 'fail to create order',
                status: 500,
                route: '/createOrder'
            });
        }


    }


}


export default new ShiprocketController();