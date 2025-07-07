import { getClassRoster } from '../vendor/CanvasService';

describe('CanvasService - Class Roster', () => {
  const courseId = 123;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches list of students and teachers in a course', async () => {
    const mockUsers = [
      { id: 1, name: 'Alice Student', role: 'StudentEnrollment' },
      { id: 2, name: 'Bob Student', role: 'StudentEnrollment' },
      { id: 3, name: 'Dr. Smith', role: 'TeacherEnrollment' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    );

    const result = await getClassRoster(courseId);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/courses/${courseId}/users?enrollment_type[]=student&enrollment_type[]=teacher`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    expect(result).toHaveLength(3);
    expect(result.find(u => u.name === 'Dr. Smith').role).toBe('TeacherEnrollment');
    expect(result.every(u => u.name)).toBe(true);
  });
});
