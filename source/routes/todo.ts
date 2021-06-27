import express from 'express';
import Middleware from '../middleware';
import TodoController from '../controllers/todoController';

const router = express.Router();

router.post('/create', Middleware.handleValidationError, TodoController.create);

export default router;
