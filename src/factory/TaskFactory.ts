import { TaskRepository } from "../repository/mysql/TaskRepository";
import { TaskService } from "../services/TaskService";
import { TaskController } from "../routes/tasks/TaskController";

// >>>>>> temporary test <<<<<

import { TasksRepositoryInMemory } from "../repository/in-memory/TasksRepositoryInMemory";

export default class MaintenanceTaskFactory {
  static async createInstance() {
    // const taskRepository = new TaskRepository();  >>>>>> temporary test <<<<<
    const taskRepository = new TasksRepositoryInMemory();
    const taskService = new TaskService(taskRepository);
    const taskController = new TaskController(taskService);
    
    return taskController;
  }
}