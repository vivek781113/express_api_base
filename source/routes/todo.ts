import express from 'express';
import Middleware from '../middleware';
import TodoController from '../controllers/todo-controller';
import TodoValidator from '../validator/todo';

const router = express.Router();

router.post('/create', TodoValidator.checkCreateTodo(), Middleware.handleValidationError, TodoController.create);
router.get('/read', TodoValidator.checkReadTodo(), Middleware.handleValidationError, TodoController.read);

export default router;
