import {
  updateProfilePicture,
  updateBio,
  getProfile,
} from '../CanvasService';

describe('CanvasService - Update Profile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('student can update their profile picture', async () => {
    const newPictureUrl = 'https://cdn.example.com/profile.jpg';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            avatar_url: newPictureUrl,
          }),
      })
    );

    const result = await updateProfilePicture(newPictureUrl);

    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/users/self/profile',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: newPictureUrl }),
      }
    );

    expect(result.avatar_url).toBe(newPictureUrl);
  });

  test('student can update their bio', async () => {
    const newBio = 'Frontend dev and lifelong learner.';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            bio: newBio,
          }),
      })
    );

    const result = await updateBio(newBio);

    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/users/self/profile',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: newBio }),
      }
    );

    expect(result.bio).toBe(newBio);
  });

  test('can verify profile updates from getProfile', async () => {
    const expectedProfile = {
      avatar_url: 'https://cdn.example.com/profile.jpg',
      bio: 'Updated bio!',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedProfile),
      })
    );

    const result = await getProfile();

    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/users/self/profile',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    expect(result.avatar_url).toBe(expectedProfile.avatar_url);
    expect(result.bio).toBe(expectedProfile.bio);
  });
});
