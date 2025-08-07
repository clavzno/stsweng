// src/tests/Courses.test.jsx

import { GET } from '../app/api/student/dashboard/route';
import { setupMockStudentData, teardown } from './testHelpers';

describe('GET /api/student/dashboard', () => {
  beforeAll(async () => {
    await setupMockStudentData(); // Populate mock data
  });

  afterAll(async () => {
    await teardown(); // Cleanup mock data
  });

  test('returns student courses with modules and discussion boards', async () => {
    const request = new Request('http://localhost/api/student/dashboard', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer mockStudentToken',
      },
    });

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty('courses');
    expect(Array.isArray(body.courses)).toBe(true);
    expect(body.courses.length).toBeGreaterThan(0);

    const course = body.courses[0];
    expect(course).toHaveProperty('title');
    expect(course).toHaveProperty('modules');
    expect(course.modules.length).toBeGreaterThan(0);
    expect(course).toHaveProperty('discussionBoard');
    expect(course).toHaveProperty('pages');
    expect(course.pages).toEqual(expect.arrayContaining(['Announcements', 'Grades']));
  });
});