import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MovieTile from './index';
import { useAuth } from '../../provider/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { deleteMovieThunk, fetchMoviesThunk } from '../../store/thunks';
import type { MovieProps } from '../../pages/MoviesList/type';

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

vi.mock('@mui/material', () => ({
  IconButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('@mui/icons-material/MoreVert', () => ({
  default: () => <span>menu</span>,
}));

vi.mock('./Poster', () => ({
  default: ({ title }: { title: string }) => <div>{`Poster: ${title}`}</div>,
}));

vi.mock('./Info', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock('./TooltipContent', () => ({
  default: ({ onDelete }: { onDelete: () => void }) => (
    <button onClick={onDelete}>delete-movie</button>
  ),
}));

vi.mock('../common/ConfirmModal', () => ({
  default: ({
    onConfirm,
    onClose,
  }: {
    onConfirm: () => void;
    onClose: () => void;
  }) => (
    <div data-testid="confirm-modal">
      <button onClick={onConfirm}>confirm-delete</button>
      <button onClick={onClose}>close-confirm</button>
    </div>
  ),
}));

vi.mock('../../provider/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../../store/thunks', () => ({
  deleteMovieThunk: vi.fn(),
  fetchMoviesThunk: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);
const mockedUseAppDispatch = vi.mocked(useAppDispatch);
const mockedDeleteMovieThunk = vi.mocked(deleteMovieThunk);
const mockedFetchMoviesThunk = vi.mocked(fetchMoviesThunk);

const dispatchMock = vi.fn();

const movie: MovieProps = {
  id: 11,
  title: 'Movie Eleven',
  tagline: 'tagline',
  vote_average: 8,
  vote_count: 100,
  release_date: '2020-01-01',
  poster_path: '/poster.jpg',
  overview: 'overview',
  budget: 100,
  revenue: 200,
  runtime: 120,
  genres: ['Drama'],
};

function renderMovieTile(initialPath = '/movies') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <MovieTile movie={movie} />
    </MemoryRouter>
  );
}

describe('MovieTile', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    dispatchMock.mockReset();
    mockedDeleteMovieThunk.mockReset();
    mockedFetchMoviesThunk.mockReset();

    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: false,
      isAuthenticated: true,
    });

    mockedUseAppDispatch.mockReturnValue(dispatchMock);

    mockedDeleteMovieThunk.mockImplementation(
      () =>
        (() => Promise.resolve(undefined)) as unknown as ReturnType<
          typeof deleteMovieThunk
        >
    );

    mockedFetchMoviesThunk.mockImplementation(
      () =>
        (() => Promise.resolve(undefined)) as unknown as ReturnType<
          typeof fetchMoviesThunk
        >
    );

    dispatchMock.mockResolvedValue(undefined);
  });

  test('navigates to movie details when card is clicked', async () => {
    const user = userEvent.setup();

    renderMovieTile();

    await user.click(screen.getByText('Movie Eleven'));

    expect(navigateMock).toHaveBeenCalledWith('/11');
  });

  test('does not render admin menu button for non-admin users', () => {
    renderMovieTile();

    expect(screen.queryByRole('button', { name: 'menu' })).toBeNull();
    expect(screen.queryByText('menu')).toBeNull();
  });

  test('admin can delete movie and triggers delete and refetch dispatch', async () => {
    const user = userEvent.setup();

    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: true,
      isAuthenticated: true,
    });

    renderMovieTile(
      '/movies?search=matrix&filter=drama&sortBy=release_date&sortOrder=asc&page=2'
    );

    await user.click(screen.getByRole('button', { name: 'menu' }));
    await user.click(screen.getByRole('button', { name: 'delete-movie' }));

    expect(screen.getByTestId('confirm-modal')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'confirm-delete' }));

    expect(mockedDeleteMovieThunk).toHaveBeenCalledWith(11);
    expect(mockedFetchMoviesThunk).toHaveBeenCalledWith({
      search: 'matrix',
      filter: 'drama',
      sortBy: 'release_date',
      sortOrder: 'asc',
      offset: 10,
      limit: 10,
    });
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(screen.queryByTestId('confirm-modal')).toBeNull();
  });
});
