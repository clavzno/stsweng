import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from '../../components/FileUpload';
import * as CanvasService from '../../vendor/CanvasService';

jest.mock('../../vendor/CanvasService');

describe('FileUpload component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('uploads a file and shows success message', async () => {
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    CanvasService.uploadFile.mockResolvedValueOnce({ success: true });

    render(<FileUpload assignmentId="12345" />);

    const fileInput = screen.getByLabelText(/upload file/i);
    fireEvent.change(fileInput, {
      target: { files: [mockFile] }
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(CanvasService.uploadFile).toHaveBeenCalledWith('12345', mockFile);
      expect(screen.getByText(/upload successful/i)).toBeInTheDocument();
    });
  });

  test('shows error message when upload fails', async () => {
    const mockFile = new File(['bad content'], 'bad.pdf', { type: 'application/pdf' });

    CanvasService.uploadFile.mockResolvedValueOnce({ success: false });

    render(<FileUpload assignmentId="12345" />);

    const fileInput = screen.getByLabelText(/upload file/i);
    fireEvent.change(fileInput, {
      target: { files: [mockFile] }
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(CanvasService.uploadFile).toHaveBeenCalledWith('12345', mockFile);
      expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
    });
  });
});