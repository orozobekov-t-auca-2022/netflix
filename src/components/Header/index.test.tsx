import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './index';
import { useAuth } from '../../provider/useAuth';

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

vi.mock('../../provider/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe('Header', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    localStorage.clear();

    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: false,
      isAuthenticated: false,
    });
  });

  test('renders logo link to home page', () => {
    renderHeader();

    const logoLink = screen.getByRole('link', { name: /netflix\s+roulette/i });
    expect(logoLink.getAttribute('href')).toBe('/');
  });

  test('shows add movie button for admin and navigates on click', async () => {
    const user = userEvent.setup();
    localStorage.setItem('user', JSON.stringify({ name: 'Admin User' }));
    mockedUseAuth.mockReturnValue({
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin',
        token: 'token',
      },
      token: 'token',
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: true,
      isAuthenticated: true,
    });

    renderHeader();

    await user.click(screen.getByRole('button', { name: /add movie/i }));

    expect(navigateMock).toHaveBeenCalledWith('/create-movie');
  });

  test('does not show add movie button for non-admin', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Regular User' }));
    mockedUseAuth.mockReturnValue({
      user: {
        id: 2,
        name: 'Regular User',
        email: 'user@test.com',
        role: 'user',
        token: 'token',
      },
      token: 'token',
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: false,
      isAuthenticated: true,
    });

    renderHeader();

    expect(screen.queryByRole('button', { name: /add movie/i })).toBeNull();
  });

  test('opens user menu and logs out', async () => {
    const user = userEvent.setup();
    const logoutMock = vi.fn(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
    localStorage.setItem('user', JSON.stringify({ name: 'Ivan' }));
    localStorage.setItem('token', 'token-value');
    mockedUseAuth.mockReturnValue({
      user: {
        id: 3,
        name: 'Ivan',
        email: 'ivan@test.com',
        role: 'user',
        token: 'token-value',
      },
      token: 'token-value',
      login: vi.fn(),
      logout: logoutMock,
      isAdmin: false,
      isAuthenticated: true,
    });

    renderHeader();

    await user.click(screen.getByRole('button', { name: 'I' }));
    expect(screen.getByText('Logout')).toBeTruthy();

    await user.click(screen.getByText('Logout'));

    expect(logoutMock).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith('/login', { replace: true });
  });
});
