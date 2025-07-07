import { getZoomLink } from '../vendor/CanvasService';

describe('CanvasService.getZoomLink', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns Zoom link when Zoom is found in tools list', async () => {
    const mockTools = [
      { name: 'Zoom', url: 'https://zoom.us/j/987654321' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTools
    });

    const result = await getZoomLink('CS101');

    expect(fetch).toHaveBeenCalledWith(
      'https://canvas.instructure.com/api/v1/courses/CS101/external_tools'
    );
    expect(result).toBe('https://zoom.us/j/987654321');
  });

  test('returns empty string when Zoom is not found', async () => {
    const mockTools = [
      { name: 'NotZoom', url: 'https://other.tool.com' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTools
    });

    const result = await getZoomLink('CS102');

    expect(result).toBe('');
  });

  test('throws an error if the API request fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(getZoomLink('CS103')).rejects.toThrow('Failed to fetch Zoom link');
  });
});