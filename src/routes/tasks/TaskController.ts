import { Request, Response } from "express";
import { TaskService } from "../../services/TaskService";
import { Task } from "../../entities/Task";

class TaskController {
  constructor(private taskService: TaskService) {}

  async httpAddTask(req: Request, res: Response) {
    const { userId, summary } = req.body;

    if (!this.checkUserId(userId))
      return res.status(400).json({ error: 'invalid userId' });
    if (!this.checkSummary(summary))
      return res.status(400).json({ error: 'invalid summary' });

    const task = await this.taskService.add({ userId, summary });

    return res.status(200).json(task);
  }

  async httpListTasks(req: Request, res: Response) {
    const task = await this.taskService.list();

    return res.status(200).json(task);
  }

  async httpUpdateTask(req: Request, res: Response) {
    const taskToUpdate: Task = req.body;

    if (!this.checkUserId(taskToUpdate.userId!))
      return res.status(400).json({ error: 'invalid userId' });
    if (!this.checkSummary(taskToUpdate.summary))
      return res.status(400).json({ error: 'invalid summary' });

    const task = await this.taskService.update(taskToUpdate);

    return res.status(200).json(task);
  }

  async httpDeleteTask(req: Request, res: Response) {
    const { id } = req.body;
    const deletedTask = await this.taskService.delete( id );

    return res.json(deletedTask);
  }

  checkUserId(userId: string) {
    // text or number. 
    // Size between 3 to 100
    const PWD_REGEX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    if (!userId)
        return false;
    if(PWD_REGEX.test(userId)) 
        return true; 
  
    return false; 
  }

  checkSummary(summary: string) {
    // Matches any alphanumeric character or the specified symbols. 
    // Size between 3 to 100
    const PWD_REGEX = /^.{3,100}$/;
    if (!summary)
        return false;
    if(PWD_REGEX.test(summary)) 
        return true; 
  
    return false; 
  }
}

export { TaskController };