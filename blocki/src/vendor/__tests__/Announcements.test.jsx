import {
  getAnnouncements,
  replyToAnnouncement
} from '../src/vendor/CanvasService';

describe('CanvasService - Announcements', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches announcements for a course', async () => {
    const mockAnnouncements = [
      {
        id: 1,
        title: 'Welcome!',
        message: 'Welcome to the course!',
        allow_comments: true
      },
      {
        id: 2,
        title: 'Exam Info',
        message: 'Exam on Friday',
        allow_comments: false
      }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnnouncements
    });

    const result = await getAnnouncements('CS101');

    expect(fetch).toHaveBeenCalledWith(
      'https://canvas.instructure.com/api/v1/announcements?context_codes[]=course_CS101'
    );
    expect(result).toEqual(mockAnnouncements);
  });

  test('throws error when announcements API fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(getAnnouncements('CS101')).rejects.toThrow('Failed to fetch announcements');
  });

  test('replies to announcement if allowed', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    const result = await replyToAnnouncement(1, 'Thanks for the update!');

    expect(fetch).toHaveBeenCalledWith(
      'https://canvas.instructure.com/api/v1/discussion_topics/1/entries',
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({
          message: 'Thanks for the update!'
        })
      })
    );

    expect(result).toEqual({ success: true });
  });

  test('returns failure if reply fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const result = await replyToAnnouncement(2, 'Cool.');

    expect(result).toEqual({ success: false });
  });
});