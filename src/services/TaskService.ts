import { Task } from "../entities/Task";
import { ITaskRepository } from "../repository/ITaskRepository"

interface IAddTaskRequest {
  userId: string;
  summary: string;
};
interface IEditTaskRequest {
  id: string;
  summary: string;
};
class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async add({ userId, summary }: IAddTaskRequest) {
    const taskAlreadyExists = await this.taskRepository.exists(userId);

    if (taskAlreadyExists) {
      throw new Error("Task already exists!");
    }

    const taskCreate = Task.create({ userId, summary });
    const task = await this.taskRepository.add(taskCreate);
    return task;
  }

  async update(taskToUpdate: Task) {
    const updatedTask = await this.taskRepository.update(taskToUpdate);

    if (!updatedTask) {
      throw new Error("Error updating task!");
    }

    return updatedTask;
  }

  async delete(id: string) {
    const taskDeleted = await this.taskRepository.delete(id);

    if (!taskDeleted) {
      throw new Error("Error deleting task!");
    }

    return taskDeleted;
  }

  async list() {
    return await this.taskRepository.list();
  }
}

export { 
  TaskService,
 };