import { render, screen, waitFor } from '@testing-library/react';
import AnnouncementPopup from '../../components/AnnouncementPopup';

describe('AnnouncementPopup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays latest announcement in a popup', async () => {
    const mockAnnouncements = [
      {
        id: 1,
        title: 'Emergency Maintenance',
        message: 'Canvas will be down for 2 hours tonight.',
        posted_at: '2025-07-02T09:00:00Z',
        read: false,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAnnouncements),
      })
    );

    render(<AnnouncementPopup />);

    await waitFor(() => {
      expect(screen.getByText(/Emergency Maintenance/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Canvas will be down for 2 hours tonight/i)
      ).toBeInTheDocument();
    });
  });

  test('does not show popup if there are no unread announcements', async () => {
    const mockAnnouncements = [
      {
        id: 2,
        title: 'Welcome Message',
        message: 'The semester starts next week!',
        posted_at: '2025-06-01T10:00:00Z',
        read: true,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAnnouncements),
      })
    );

    render(<AnnouncementPopup />);

    await waitFor(() => {
      expect(
        screen.queryByText(/Welcome Message/i)
      ).not.toBeInTheDocument();
    });
  });
});
