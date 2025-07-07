import { carryOverIncompleteTasks } from '../lib/taskManager'; // the function to implement CHANGE IF NEEDED
import { getTasksForDate, saveTasks } from '../lib/taskRepository'; // mocked CHANGE IF NEEDED

jest.mock('../lib/taskRepository');

describe('Task carry-over logic', () => {
  const yesterday = '2025-07-06';
  const today = '2025-07-07';

  const mockTasks = [
    { id: 1, title: 'Finish essay', completed: false, dueDate: yesterday },
    { id: 2, title: 'Read chapter 3', completed: true, dueDate: yesterday },
    { id: 3, title: 'Prepare quiz', completed: false, dueDate: yesterday }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('incomplete tasks from yesterday are carried over to today', async () => {
    getTasksForDate.mockResolvedValue(mockTasks);
    saveTasks.mockResolvedValue(true);

    await carryOverIncompleteTasks(yesterday, today);

    expect(getTasksForDate).toHaveBeenCalledWith(yesterday);

    // Expect saveTasks to be called with only the incomplete ones, updated to today
    expect(saveTasks).toHaveBeenCalledWith([
      expect.objectContaining({ title: 'Finish essay', dueDate: today }),
      expect.objectContaining({ title: 'Prepare quiz', dueDate: today }),
    ]);
  });
});