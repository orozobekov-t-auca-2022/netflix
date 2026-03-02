import { describe, expect, test, vi } from 'vitest';
import ConfirmModal from './ConfirmModal';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('ConfirmModal', () => {
  test('renders modal content', () => {
    render(<ConfirmModal onClose={vi.fn()} onConfirm={vi.fn()} />);

    expect(screen.getByText('Delete Movie')).toBeTruthy();
    expect(
      screen.getByText('Are you sure you want to delete this movie?')
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeTruthy();
  });

  test('calls onConfirm on confirm button click', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ConfirmModal onClose={vi.fn()} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: /confirm/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <ConfirmModal onClose={onClose} onConfirm={vi.fn()} />
    );

    await user.click(container.firstElementChild as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when close icon is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ConfirmModal onClose={onClose} onConfirm={vi.fn()} />);

    await user.click(screen.getByText('✕'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
