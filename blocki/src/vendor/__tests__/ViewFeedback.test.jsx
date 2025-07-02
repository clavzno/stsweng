import { getAssignmentFeedback } from '../CanvasService';

describe('CanvasService - Assignment Feedback', () => {
  const courseId = 123;
  const assignmentId = 456;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches professor feedback for a submitted assignment', async () => {
    const mockFeedback = [
      {
        comment: "Great job on the research section.",
        author_name: "Prof. Smith",
        created_at: "2025-07-02T10:00:00Z"
      }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            submission_comments: mockFeedback,
          }),
      })
    );

    const result = await getAssignmentFeedback(courseId, assignmentId);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/self`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    expect(result).toEqual(mockFeedback);
    expect(result[0].comment).toContain('Great job');
  });
});
