import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('./components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('./components/common/PrivateRoute', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="private-route">{children}</div>
  ),
}));

vi.mock('./pages/MoviesList', () => ({
  default: () => <div data-testid="movies-list-page">MoviesList</div>,
}));

vi.mock('./pages/Login', () => ({
  default: () => <div data-testid="login-page">Login</div>,
}));

vi.mock('./pages/MovieDetails', () => ({
  default: () => <div data-testid="movie-details-page">MovieDetails</div>,
}));

vi.mock('./pages/MovieForm', () => ({
  default: ({ mode }: { mode: 'create' | 'edit' }) => (
    <div data-testid="movie-form-page">{mode}</div>
  ),
}));

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('App routing', () => {
  test('renders login page on /login', () => {
    renderAt('/login');

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
    expect(screen.getByTestId('login-page')).toBeTruthy();
  });

  test('renders movies list on /', () => {
    renderAt('/');

    expect(screen.getByTestId('private-route')).toBeTruthy();
    expect(screen.getByTestId('movies-list-page')).toBeTruthy();
  });

  test('renders movie details page on /:movieId', () => {
    renderAt('/123');

    expect(screen.getByTestId('movie-details-page')).toBeTruthy();
  });

  test('renders create movie form on /create-movie', () => {
    renderAt('/create-movie');

    expect(screen.getByTestId('movie-form-page').textContent).toBe('create');
  });

  test('renders edit movie form on /:movieId/edit-movie', () => {
    renderAt('/123/edit-movie');

    expect(screen.getByTestId('movie-form-page').textContent).toBe('edit');
  });
});
