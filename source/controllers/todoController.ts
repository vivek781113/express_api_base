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
}


export default new TodoController();