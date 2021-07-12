import { Request, Response } from 'express';
import { TodoInstance } from '../model/todo';
import { v4 as uuidv4 } from 'uuid';
import logging from '../config/logging';

const NAMESPACE = 'TodoController';

class TodoController {
    async create(req: Request, res: Response) {
        try {
            const id = uuidv4();
            const record = await TodoInstance.create({ ...req.body, id });
            return res.json({
                record,
                msg: 'Sucessfully created todo',
                status: 201,
            })
        } catch (error) {
            logging.error(NAMESPACE, 'Error while creating todo', error);
            return res.json({
                msg: 'fail to create todo',
                status: 500,
                route: '/create'
            });
        }
    }
    async read(req: Request, res: Response) {
        try {
            logging.info(NAMESPACE, 'enter read()', req.body);
            const limit = req.query?.limit as number | undefined;
            let page = req.query?.page as number | undefined;

            if (!page)
                page = 0;
            let offset = 0;

            if (limit)
                offset = 0 + (page - 1) * limit;
            const records = await TodoInstance.findAll({ where: {}, limit: limit, offset: offset });
            return res.json({
                records,
                msg: 'Fetched todos',
                status: 200
            });
        }
        catch (error) {
            logging.error(NAMESPACE, 'Error while reading todo', error);
            return res.json({
                msg: 'fail to read todo',
                status: 500,
                route: '/read'
            });
        }
    }
}


export default new TodoController();