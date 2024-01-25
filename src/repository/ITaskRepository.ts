import { Task } from "../entities/Task";

export interface ITaskRepository {
  add(maintenanceTask: Task): Promise<Task>;
  update(maintenanceTask: Task): Promise<Task>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  list(): Promise<Task[]>;
}