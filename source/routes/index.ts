import todo from './todo';
import sample from './sample';
import shiprocket from './shiprocket';
import { Router } from 'express';


const rootRouter = Router();

rootRouter.use('/todo', todo);
rootRouter.use('/sample', sample);
rootRouter.use('/shiprocket', shiprocket);


export default rootRouter;