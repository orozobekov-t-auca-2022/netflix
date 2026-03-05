import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './index';
import { useAuth } from '../../provider/useAuth';

vi.mock('../../components/LoginForm', () => ({
  default: () => <div data-testid="login-form" />,
}));

vi.mock('../../provider/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

describe('Login page', () => {
  test('renders LoginForm component', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
      isAdmin: false,
      token: null,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByTestId('login-form')).toBeTruthy();
  });

  test('renders wrapper element around LoginForm', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: false,
      isAdmin: false,
      token: null,
    });

    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const pageWrapper = container.firstElementChild as HTMLElement | null;

    expect(pageWrapper).not.toBeNull();
    expect(pageWrapper?.contains(screen.getByTestId('login-form'))).toBe(true);
  });

  test('redirects to home when user is authenticated', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
      isAdmin: false,
      token: 'token',
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('login-form')).toBeNull();
  });
});
