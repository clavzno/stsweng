import {
  subscribeToDiscussion,
  unsubscribeFromDiscussion,
  getSubscriptionStatus,
} from '../../vendor/CanvasService';

describe('CanvasService - Discussion Board Subscription', () => {
  const courseId = 101;
  const topicId = 202;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('student can subscribe to a discussion topic', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ subscribed: true }),
      })
    );

    const result = await subscribeToDiscussion(courseId, topicId);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/courses/${courseId}/discussion_topics/${topicId}/subscribed`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscribed: true }),
      }
    );
    expect(result.subscribed).toBe(true);
  });

  test('student can unsubscribe from a discussion topic', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ subscribed: false }),
      })
    );

    const result = await unsubscribeFromDiscussion(courseId, topicId);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/courses/${courseId}/discussion_topics/${topicId}/subscribed`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscribed: false }),
      }
    );
    expect(result.subscribed).toBe(false);
  });

  test('can check if student is subscribed to a discussion topic', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ subscribed: true }),
      })
    );

    const result = await getSubscriptionStatus(courseId, topicId);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/courses/${courseId}/discussion_topics/${topicId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    expect(result.subscribed).toBe(true);
  });
});
