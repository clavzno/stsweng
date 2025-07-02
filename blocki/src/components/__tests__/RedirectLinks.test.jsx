import { render, screen } from '@testing-library/react';
import QuizAssignmentLinks from '../QuizAssignmentLinks'; // change the path as necessary
import '@testing-library/jest-dom';

describe('QuizAssignmentLinks', () => {
  const courseId = 101;

  test('renders quiz and assignment links with correct URLs', () => {
    render(<QuizAssignmentLinks courseId={courseId} />);

    const quizLink = screen.getByText(/Go to Quizzes/i);
    const assignmentLink = screen.getByText(/Go to Assignments/i);

    expect(quizLink).toHaveAttribute(
      'href',
      `https://canvas.instructure.com/courses/${courseId}/quizzes`
    );
    expect(assignmentLink).toHaveAttribute(
      'href',
      `https://canvas.instructure.com/courses/${courseId}/assignments`
    );
  });
});
