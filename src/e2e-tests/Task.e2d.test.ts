import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import { mockedTasks } from './mockedTasks';
import { Task } from '../entities/Task';

describe('#E2E tests for tasks.', () => {

  describe('Test POST /task/add', () => {
    test('It should respond with 200 success + Content-Type = json.', async () => {

      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: 'E2E Test summary #1',
      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(200);
            
        expect(response.body).toMatchObject(taskData);
        expect(response.body.summary).toBe('E2E Test summary #1');
    });

    test('It should respond with 400 bad request + Content-Type = json for bad formatted userId.', async () => {

      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-',
        summary: 'E2E Test summary #2 error',
      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(400);
            
        expect(response.body).toEqual({ error: 'invalid userId' });
    });

    test('It should respond with 400 bad request + Content-Type = json for bad formatted summary.', async () => {

      const taskData = {
        userId: '533b7681-b1c3-4244-8a37-423ae7a3d8ac',
        summary: '',
      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(400);
            
        expect(response.body).toEqual({ error: 'invalid summary' });
    });

    test('It should respond with 400 bad request + Content-Type = json for bad formatted task.', async () => {

      const taskData = {

      };
      
      const response = await request(app)
        .post('/task/add')
        .send(taskData)
        .expect('Content-Type', /json/)
        .expect(400);
            
        expect(response.body).toEqual({ error: 'invalid userId' });
    });
  });

  describe('Test GET /task/list', () => {
    test('It should respond with 200 success + Content-Type = json containing a Task like object.', async () => {
        const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);
            
            expect(response.body).toEqual(mockedTasks);
            expect(response.body).toMatchObject(mockedTasks);
            expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Test GET /task/update/:id', () => {
    test('It should respond with 200 success + Content-Type = json with the updated task.', async () => {
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskExpected: Task = Object.assign({}, response.body.pop());

      taskExpected.summary = 'Updating task summary with this info!';

      const responseUpdate = await request(app)

          .put('/task/update/'+ taskExpected.id)
          .send(taskExpected)
          .expect('Content-Type', /json/)
          .expect(200);

          expect(responseUpdate.body).toEqual(taskExpected);

    });

    test('It should respond with 400 bad request + Content-Type = json when trying to update the task with a too long summary.', async () => {
      const repeatedSummary = 'A';
      const response = await request(app)
            .get('/task/list')
            .expect('Content-Type', /json/)
            .expect(200);

      const taskExpected: Task = Object.assign({}, response.body.pop());

      taskExpected.summary = repeatedSummary.repeat(101);

      const responseUpdate = await request(app)

          .put('/task/update/'+ taskExpected.id)
          .send(taskExpected)
          .expect('Content-Type', /json/)
          .expect(400);

          expect(responseUpdate.body).toEqual({ error: 'invalid summary' });

    });
  });

});