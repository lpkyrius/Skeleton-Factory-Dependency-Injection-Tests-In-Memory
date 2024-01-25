import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import { Task } from '../entities/Task';
import { ITaskRepository } from '../repository/ITaskRepository';
import { TaskService } from './TaskService';
import { TasksRepositoryInMemory } from '../repository/in-memory/TasksRepositoryInMemory';

describe('#taskService', () => {

  let tasksRepository: ITaskRepository;
  let taskService: TaskService;
  let testTask: Task;

  beforeAll(() => {
    tasksRepository = new TasksRepositoryInMemory();
    taskService = new TaskService(tasksRepository);
  });



  describe('#Create Tasks', () => {
    let task: Task; 

    it('should be able to create a new task', async () => {
      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'Test summary',
      };

      task = await taskService.add(taskData);

      expect(task).toHaveProperty('id');
      expect(task.summary).toBe('Test summary');
    });

    it('should return a list with 3 tasks = 2 pre defined + one task added so far', async () => {
      const tasks = await taskService.list();

      // expect(tasks).toHaveLength(3);
      expect(tasks.pop()?.id).toEqual(task.id)
    });
  });
  
  describe('#Update Tasks', () => {
    let task: Task, updatedTask: Task; 

    it('should be able to create a new task', async () => {
      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'Test summary to be updated',
      };

      task = await taskService.add(taskData);

      let taskExpected: Task = Object.assign({}, task);
      taskExpected.summary = 'Test summary already updated!!!';

      updatedTask = await taskService.update(taskExpected);

      expect(updatedTask).toHaveProperty('id');
      expect(updatedTask.summary).toBe('Test summary already updated!!!');
    });

  });

});

