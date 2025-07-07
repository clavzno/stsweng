import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';
import * as CanvasService from '../../vendor/CanvasService';

jest.mock('../../vendor/CanvasService');

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches fresh Canvas data on every render (refresh)', async () => {
    const mockData = {
      name: 'Jane Student',
      enrolledCourses: ['CS101', 'ENG102'],
    };

    CanvasService.fetchStudentData.mockResolvedValueOnce(mockData);

    render(<Dashboard />);

    expect(CanvasService.fetchStudentData).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Jane Student')).toBeInTheDocument();
      expect(screen.getByText('CS101')).toBeInTheDocument();
      expect(screen.getByText('ENG102')).toBeInTheDocument();
    });
  });
});