import { expect, describe, jest, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import { mockedTasks } from './mockedTasks';

describe('#E2E tests for tasks.', () => {
  let testId: string;

  describe('Test GET /task/list', () => {
    test('It should respond with 200 success + Content-Type = json, containing the 2 pre defined tasks from in-memory repository.', async () => {
        const response = await request(app)
            .get('/task/list')
            // .set('Authorization', 'bearer ' + accessToken)
            .expect('Content-Type', /json/)
            .expect(200);
            
            expect(response.body).toEqual(mockedTasks);
            expect(response.body).toMatchObject(mockedTasks);
        
        // testId = response.body[0].id;
    });
  });


});