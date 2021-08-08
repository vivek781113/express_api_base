import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import reqApi from '../services/req-api';
import shortid from 'shortid';

const NAMESPACE = 'Sample Controller'

const sampleHealthCheck = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Sample health check route called.`)

    const loginResponse = await reqApi.login({
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    });

    logging.info(NAMESPACE, `Login token ${loginResponse.token}`);
    return res.status(200).json({
        message: 'pong ' + loginResponse.token
    });
};

const fetchData = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `fetchData() called`);
    return res.status(200).json({
        'message': 'request completed'
    });
}
const genAPIKey = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `genAPIKey() called`);
    const API_KEY = shortid.generate();
    return res.status(201).json({
        'apiKey': API_KEY
    });

}


export default {
    sampleHealthCheck,
    fetchData,
    genAPIKey
};
