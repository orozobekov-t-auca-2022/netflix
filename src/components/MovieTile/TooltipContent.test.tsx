import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TooltipContent from './TooltipContent';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('TooltipContent', () => {
  test('calls onClose when close icon is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <TooltipContent movieId={10} onClose={onClose} onDelete={vi.fn()} />
    );

    await user.click(screen.getByText('✕'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('navigates to edit page and closes tooltip on edit click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <TooltipContent movieId={10} onClose={onClose} onDelete={vi.fn()} />
    );

    await user.click(screen.getByText('edit'));

    expect(navigateMock).toHaveBeenCalledWith('/10/edit-movie');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onDelete on delete click', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <TooltipContent movieId={10} onClose={vi.fn()} onDelete={onDelete} />
    );

    await user.click(screen.getByText('delete'));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
