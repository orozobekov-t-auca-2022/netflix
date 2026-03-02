import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('does not render when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onChange={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders pagination when totalPages is greater than 1', () => {
    render(<Pagination currentPage={1} totalPages={3} onChange={vi.fn()} />);

    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  test('calls onChange with selected page', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Pagination currentPage={1} totalPages={3} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /go to page 2/i }));

    expect(onChange).toHaveBeenCalledWith(2);
  });
});
