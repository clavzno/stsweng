// studentView.test.js

const request = require('supertest');
const app = require('../app'); // Express app
const { setupMockStudentData, teardown } = require('./testHelpers');

describe('Student course view', () => {
  beforeAll(async () => {
    await setupMockStudentData(); // insert courses, modules, etc.
  });

  afterAll(async () => {
    await teardown(); // cleanup test DB
  });

  test('student can view enrolled courses with modules and discussion boards', async () => {
    const response = await request(app)
      .get('/api/student/dashboard')
      .set('Authorization', 'Bearer mockStudentToken');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('courses');
    expect(response.body.courses.length).toBeGreaterThan(0);

    const course = response.body.courses[0];
    expect(course).toHaveProperty('title');
    expect(course).toHaveProperty('modules');
    expect(course.modules.length).toBeGreaterThan(0);
    expect(course).toHaveProperty('discussionBoard');
    expect(course).toHaveProperty('pages');
    expect(course.pages).toContain('Announcements');
    expect(course.pages).toContain('Grades');
  });
});