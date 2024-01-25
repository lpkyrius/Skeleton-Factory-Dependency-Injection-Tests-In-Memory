import { Task } from "../entities/Task";

export interface ITaskRepository {
  add(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(task: Task): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  list(): Promise<Task[]>;
}