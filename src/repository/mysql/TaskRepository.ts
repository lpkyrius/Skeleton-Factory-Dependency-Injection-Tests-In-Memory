



// this file will receive the ../../models/tasks/tasks.model.js methods
import { db } from '../../repository/mysql/mysql';
// async function getAllTasks(roleFilter) {
//     try {
//         let query = db('maintenance_task').select('*').from('maintenance_task');
//                   /ˆˆˆ\

import { Task } from "../../entities/Task";
import { ITaskRepository } from "../ITaskRepository";

class TaskRepository implements ITaskRepository {
    async add({ userId, summary }: Task): Promise<Task> {
        const task = { userId, summary };
        // const task = await prisma.user.create({
        //   data: {
        //     userId, 
        //     summary
        //   },
        // });
    
        return task;
    }

    async update({ userId, summary }: Task): Promise<Task> {
        const task = { userId, summary };
    
        return task;
    }

    async delete(id: string): Promise<boolean> {
        const task = true;

        return !!task;
    }

    async exists(id: string): Promise<boolean> {
        const task = true;
        // const task = await prisma.user.findUnique({
        //   where: {
        //     username,
        //   },
        // });

        return !!task;
    }

    async list(): Promise<Task[]> {
        return []; 
    }
}

export { TaskRepository };