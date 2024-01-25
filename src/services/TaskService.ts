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
    const taskCreate = Task.create({ userId, summary });
    const task = await this.taskRepository.add(taskCreate);

    if (!task) {
      throw new Error("Error creating task!");
    }

    return task;
  }

  async update(taskToUpdate: Task) {
    const updatedTask = await this.taskRepository.update(taskToUpdate);

    if (!updatedTask) {
      throw new Error("Error updating task!");
    }

    return updatedTask;
  }

  async delete(taskToDelete: Task) {
    const taskDeleted = await this.taskRepository.delete(taskToDelete);

    if (!taskDeleted) {
      throw new Error("Error deleting task!");
    }

    return taskDeleted;
  }

  async list() {
    return await this.taskRepository.list();
  }

  async exist(id: string): Promise<boolean> {
    return await this.taskRepository.exists(id);
  }

}

export { 
  TaskService,
 };