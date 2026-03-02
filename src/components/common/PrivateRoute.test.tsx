import { describe, expect, test, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../../provider/useAuth';

vi.mock('../../provider/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

const createAuthState = (isAuthenticated: boolean, isAdmin: boolean) => ({
  user: null,
  token: null,
  login: vi.fn(),
  logout: vi.fn(),
  isAdmin,
  isAuthenticated,
});

function renderRoute(requiredRole?: 'admin' | 'user') {
  render(
    <MemoryRouter initialEntries={['/private']}>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/login" element={<div>Login page</div>} />
        <Route
          path="/private"
          element={
            <PrivateRoute requiredRole={requiredRole}>
              <div>Protected page</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('PrivateRoute', () => {
  test('redirects unauthenticated user to login', () => {
    mockedUseAuth.mockReturnValue(createAuthState(false, false));

    renderRoute();

    expect(screen.getByText('Login page')).toBeTruthy();
  });

  test('renders protected content for authenticated user', () => {
    mockedUseAuth.mockReturnValue(createAuthState(true, false));

    renderRoute();

    expect(screen.getByText('Protected page')).toBeTruthy();
  });

  test('redirects non-admin user when admin role is required', () => {
    mockedUseAuth.mockReturnValue(createAuthState(true, false));

    renderRoute('admin');

    expect(screen.getByText('Home page')).toBeTruthy();
  });
});
