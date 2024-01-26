import { Router, Request, Response } from 'express';
import TaskFactory from '../../factory/TaskFactory';

const tasksRouter = Router();

const taskFactory = async () => {
    return await TaskFactory.createInstance();
}

tasksRouter.post('/task/add', async (req: Request, res: Response) => await (await taskFactory()).httpAddTask(req, res));
tasksRouter.get('/task/list', async (req: Request, res: Response) => await (await taskFactory()).httpListTasks(req, res));
tasksRouter.put('/task/update/:id', async (req: Request, res: Response) => await (await taskFactory()).httpUpdateTask(req, res));

    
// tasksRouter.get ('/task/list', (request, response) => taskController.httpAddTask(request, response) );  
  
// tasksRouter.put ('/task/update/:id', verifyJWT, httpUpdateTask);
// tasksRouter.delete ('/task/delete/:id', verifyJWT, httpDeleteTask);

export default tasksRouter;