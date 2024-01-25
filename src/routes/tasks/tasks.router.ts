import { Router, Request, Response } from 'express';
import MaintenanceTaskFactory from '../../factory/TaskFactory';

const tasksRouter = Router();

const maintenanceTaskFactory = async () => {
    return await MaintenanceTaskFactory.createInstance();
}

tasksRouter.get('/task/list', async (req: Request, res: Response) => await (await maintenanceTaskFactory()).httpListTasks(req, res));
tasksRouter.put('/task/update/:id', async (req: Request, res: Response) => await (await maintenanceTaskFactory()).httpUpdateTask(req, res));

    
// tasksRouter.get ('/task/list', (request, response) => taskController.httpAddTask(request, response) );  
// tasksRouter.post('/task/add', verifyJWT, httpAddTask);  
// tasksRouter.put ('/task/update/:id', verifyJWT, httpUpdateTask);
// tasksRouter.delete ('/task/delete/:id', verifyJWT, httpDeleteTask);

export default tasksRouter;