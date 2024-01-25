
import { Task } from "../../entities/Task";
import { ITaskRepository } from "../ITaskRepository";
import { v4 as uuid } from "uuid";

class TasksRepositoryInMemory implements ITaskRepository {
  private tasks: Task[] = [
    {
      id: '500994c6-b51b-4544-8dfb-ccced2b87e73',
      userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
      summary: 'Test 1st summary',
      created_at: new Date('2024-01-24T16:17:18.622Z'),
    },
    {
      id: '23c35874-d81e-4fd6-a942-3d9cb04bc87e',
      userId: '943b7681-b1c3-4244-8a37-423ae7a3d7bc',
      summary: 'Test 2nd summary',
      created_at: new Date('2024-01-24T16:17:18.622Z'),
    }
  ];

  async add(task: Task): Promise<Task> {
    Object.assign(task, {
      id: uuid(),
      created_at: Date(),
    });

    this.tasks.push(task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((taskToUpdate) => taskToUpdate.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      return task;
    }
    throw new Error("Task not found");
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length !== initialLength;
  }

  async exists(id: string): Promise<boolean> {
    return this.tasks.some((task) => task.id === id);
  }

  async list(): Promise<Task[]> {
    return [...this.tasks];
  }
}

export { TasksRepositoryInMemory };