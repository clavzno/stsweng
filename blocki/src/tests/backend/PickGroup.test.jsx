import {
  createGroup,
  joinGroup,
  getUserGroups,
} from '../../vendor/CanvasService';

describe('CanvasService - Student Group Selection and Creation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('student can create a new group', async () => {
    const groupCategoryId = 1001;
    const groupName = 'Team Alpha';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 5001, name: groupName }),
      })
    );

    const result = await createGroup(groupCategoryId, groupName);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/group_categories/${groupCategoryId}/groups`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: groupName }),
      }
    );

    expect(result.name).toBe(groupName);
  });

  test('student can join an existing group', async () => {
    const groupId = 5001;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ group_id: groupId, user_id: 123 }),
      })
    );

    const result = await joinGroup(groupId);

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/groups/${groupId}/memberships`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    expect(result.group_id).toBe(groupId);
  });

  test('student can view their current groups', async () => {
    const mockGroups = [
      { id: 5001, name: 'Team Alpha' },
      { id: 5002, name: 'Team Beta' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGroups),
      })
    );

    const result = await getUserGroups();

    expect(fetch).toHaveBeenCalledWith(
      `/api/v1/users/self/groups`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Team Alpha');
  });
});
