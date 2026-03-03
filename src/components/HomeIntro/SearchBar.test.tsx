import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

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

describe('SearchBar', () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  test('navigates with search param when query is not empty', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.type(
      screen.getByLabelText(/what do you want to watch\?/i),
      'batman'
    );
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(navigateMock).toHaveBeenCalledWith('/?search=batman');
  });

  test('removes search param when query is empty', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.type(
      screen.getByLabelText(/what do you want to watch\?/i),
      '   '
    );
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
