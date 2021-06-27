import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import reqApi from '../services/req-api';


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


export default {
    sampleHealthCheck
};
