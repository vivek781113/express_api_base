import { Request, Response } from 'express';
import logging from '../config/logging';
import { OrderPayload } from '../dto/order-payload';
import { OrderResponse } from '../dto/order-response';
import User from '../dto/user';
import ShiprocketApi from '../services/shiprocket-api';

const NAMESPACE = 'ShiprocketController';

const orderPayload: OrderPayload = {
    "order_id": "224-477",
    "order_date": "2021-01-24 11:11",
    "pickup_location": "Jammu",
    "channel_id": "12345",
    "comment": "Reseller: M/s Goku",
    "billing_customer_name": "Naruto",
    "billing_last_name": "Uzumaki",
    "billing_address": "House 221B, Leaf Village",
    "billing_address_2": "Near Hokage House",
    "billing_city": "New Delhi",
    "billing_pincode": "110002",
    "billing_state": "Delhi",
    "billing_country": "India",
    "billing_email": "naruto@uzumaki.com",
    "billing_phone": "9876543210",
    "shipping_is_billing": true,
    "shipping_customer_name": "",
    "shipping_last_name": "",
    "shipping_address": "",
    "shipping_address_2": "",
    "shipping_city": "",
    "shipping_pincode": "",
    "shipping_country": "",
    "shipping_state": "",
    "shipping_email": "",
    "shipping_phone": "",
    "order_items": [
        {
            "name": "Kunai",
            "sku": "chakra123",
            "units": 10,
            "selling_price": "900",
            "discount": "",
            "tax": "",
            "hsn": 441122
        }
    ],
    "payment_method": "Prepaid",
    "shipping_charges": 0,
    "giftwrap_charges": 0,
    "transaction_charges": 0,
    "total_discount": 0,
    "sub_total": 9000,
    "length": 10,
    "breadth": 15,
    "height": 20,
    "weight": 2.5
};

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

    async createAdhocOrder(req: Request, res: Response) {
        const { token } = req?.query;
        try {
            if (!token)
                return res.status(400).json({
                    msg: 'Authorization denied'
                });
            else {
                const shiprocketApi = new ShiprocketApi(token as string);
                const orderResponse: any = await shiprocketApi.createOrder(orderPayload);

                return res.status(201).json({
                    orderResponse
                });
            }
        } catch (error) {

            logging.error(NAMESPACE, 'Error in creating order', error.response.data);
            return res.status(500).json({
                msg: 'fail to create order',
                status: 500,
                route: '/create'
            });
        }


    }

}


export default new ShiprocketController();