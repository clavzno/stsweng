import { submitAssignment } from '../CanvasService';

describe('CanvasService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('sends correct POST request to Canvas', async () => {
    const mockResponse = { ok: true };
    fetch.mockResolvedValueOnce(mockResponse);

    const result = await submitAssignment('12345', 'Hello from test');

    expect(fetch).toHaveBeenCalledWith(
      'https://canvas.instructure.com/api/v1/assignments/12345/submissions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': expect.stringContaining('Bearer'),
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          submission: {
            body: 'Hello from test',
            submission_type: 'online_text_entry',
          }
        })
      })
    );

    expect(result).toEqual({ success: true });
  });

  test('returns failure on bad response', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const result = await submitAssignment('12345', 'bad response test');

    expect(result).toEqual({ success: false });
  });
});