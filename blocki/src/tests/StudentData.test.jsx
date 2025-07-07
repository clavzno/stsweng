import { fetchStudentData } from '../vendor/CanvasService';

describe('CanvasService', () => {
  test('fetches student data from Canvas API', async () => {
    const mockData = {
      id: 123,
      name: 'Jane Student',
      email: 'jane@example.com',
      enrolledCourses: ['CS101', 'MATH200']
    };

    // Mock fetch (or axios, depending on what you use)
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await fetchStudentData();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
    expect(result.enrolledCourses).toContain('CS101');
  });
});