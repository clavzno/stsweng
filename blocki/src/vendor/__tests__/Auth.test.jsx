import {
  getCanvasAccessToken,
  getCanvasUserInfo
} from '../src/vendor/CanvasService';

describe('CanvasService OAuth2 Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('gets Canvas access token using auth code', async () => {
    const mockTokenResponse = {
      access_token: 'fake-access-token',
      token_type: 'Bearer',
      user: { id: 12345 }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTokenResponse
    });

    const result = await getCanvasAccessToken('test-auth-code');

    expect(fetch).toHaveBeenCalledWith(
      'https://canvas.instructure.com/login/oauth2/token',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: expect.stringContaining('code=test-auth-code')
      })
    );

    expect(result).toEqual(mockTokenResponse);
  });

  test('throws if token exchange fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(getCanvasAccessToken('bad-code')).rejects.toThrow('Failed to get access token');
  });

  test('gets user profile with access token', async () => {
    const mockUser = {
      id: 123,
      name: 'Jane Student',
      email: 'jane@student.edu'
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });

    const result = await getCanvasUserInfo('fake-access-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://canvas.instructure.com/api/v1/users/self/profile',
      {
        headers: {
          'Authorization': 'Bearer fake-access-token'
        }
      }
    );

    expect(result).toEqual(mockUser);
  });

  test('throws if profile fetch fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(getCanvasUserInfo('bad-token')).rejects.toThrow('Failed to fetch user profile');
  });
});