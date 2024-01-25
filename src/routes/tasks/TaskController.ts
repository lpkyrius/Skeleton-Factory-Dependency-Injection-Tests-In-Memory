import { Request, Response } from "express";
import { TaskService } from "../../services/TaskService";


class TaskController {
  constructor(private taskService: TaskService) {}

  async httpAddTask(req: Request, res: Response) {
    const { userId, summary } = req.body;
    const task = await this.taskService.add({ userId, summary });

    return res.json(task);
  }

  async httpListTasks(req: Request, res: Response) {
    // const { userId, summary } = request.body;
    const task = await this.taskService.list();

    return res.json(task);
  }

  async httpUpdateTask(req: Request, res: Response) {

    // =========================================================================================
    // This method is responsible for rules, such as, check if the user is the owner of the task
    // =========================================================================================

    // const { userId, summary } = request.body;
    // const task = await this.taskService.add({ userId, summary });

    // return response.json(task);
    return res.status(200).json({ message: 'success' });
  }

  async httpDeleteTask(req: Request, res: Response) {
    const { id } = req.body;
    const deletedTask = await this.taskService.delete( id );

    return res.json(deletedTask);
  }
}

export { TaskController };