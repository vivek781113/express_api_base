import todo from './todo';
import sample from './sample';
import { Router } from 'express';


const rootRouter = Router();

rootRouter.use('/todo', todo);
rootRouter.use('/sample', sample);


export default rootRouter;