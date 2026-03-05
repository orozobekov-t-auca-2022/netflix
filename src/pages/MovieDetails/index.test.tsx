import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieDetails from './index';
import { useAuth } from '../../provider/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteMovieThunk, fetchMovieById } from '../../store/thunks';
import type { RootState } from '../../store';
import type { MovieProps } from '../MoviesList/type';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );

  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ movieId: '5' }),
  };
});

vi.mock('../../provider/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/thunks', () => ({
  deleteMovieThunk: vi.fn(),
  fetchMovieById: vi.fn(),
}));

vi.mock('../../components/common/ConfirmModal', () => ({
  default: ({
    onConfirm,
    onClose,
  }: {
    onConfirm: () => void;
    onClose: () => void;
  }) => (
    <div data-testid="confirm-modal">
      <button onClick={onConfirm}>confirm-delete</button>
      <button onClick={onClose}>close-delete</button>
    </div>
  ),
}));

const mockedUseAuth = vi.mocked(useAuth);
const mockedUseAppDispatch = vi.mocked(useAppDispatch);
const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedDeleteMovieThunk = vi.mocked(deleteMovieThunk);
const mockedFetchMovieById = vi.mocked(fetchMovieById);

const dispatchMock = vi.fn();

const movie: MovieProps = {
  id: 5,
  title: 'Movie Five',
  tagline: 'tagline',
  vote_average: 7,
  vote_count: 50,
  release_date: '2021-01-01',
  poster_path: '/poster.jpg',
  overview: 'overview',
  budget: 100,
  revenue: 200,
  runtime: 120,
  genres: ['Drama'],
};

const state: RootState = {
  auth: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  movies: {
    movies: [] as MovieProps[],
    loading: false,
    error: null as string | null,
  },
};

describe('MovieDetails', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    dispatchMock.mockReset();
    mockedDeleteMovieThunk.mockReset();
    mockedFetchMovieById.mockReset();

    state.movies.movies = [];
    state.movies.loading = false;
    state.movies.error = null;

    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: false,
      isAuthenticated: true,
    });

    mockedUseAppDispatch.mockReturnValue(dispatchMock);
    mockedUseAppSelector.mockImplementation((selector) => selector(state));

    mockedFetchMovieById.mockImplementation(
      () =>
        (() => Promise.resolve(undefined)) as unknown as ReturnType<
          typeof fetchMovieById
        >
    );
    mockedDeleteMovieThunk.mockImplementation(
      () =>
        (() => Promise.resolve(undefined)) as unknown as ReturnType<
          typeof deleteMovieThunk
        >
    );
  });

  test('renders loading state', () => {
    state.movies.loading = true;

    render(<MovieDetails />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('renders error state', () => {
    state.movies.error = 'Failed to fetch';

    render(<MovieDetails />);

    expect(screen.getByText('Error: Failed to fetch')).toBeTruthy();
  });

  test('dispatches fetchMovieById when movie is missing', () => {
    render(<MovieDetails />);

    expect(mockedFetchMovieById).toHaveBeenCalledWith(5);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(screen.getByText('Movie not found')).toBeTruthy();
  });

  test('renders movie details when movie exists', () => {
    state.movies.movies = [movie];

    render(<MovieDetails />);

    expect(screen.getByText('Movie Five')).toBeTruthy();
    expect(screen.getByText('overview')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeTruthy();
  });

  test('admin delete flow dispatches delete and navigates home', async () => {
    const user = userEvent.setup();
    state.movies.movies = [movie];
    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: true,
      isAuthenticated: true,
    });

    render(<MovieDetails />);

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByTestId('confirm-modal')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'confirm-delete' }));

    expect(mockedDeleteMovieThunk).toHaveBeenCalledWith(5);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
