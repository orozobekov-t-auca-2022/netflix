import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Movies from './index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMoviesThunk } from '../../store/thunks';
import type { RootState } from '../../store';
import type { MovieProps } from '../../pages/MoviesList/type';

vi.mock('./FilterBar', () => ({
  default: () => <div data-testid="filter-bar" />,
}));

vi.mock('./Count', () => ({
  default: ({ count }: { count: number }) => (
    <div data-testid="count">{String(count)}</div>
  ),
}));

vi.mock('./List', () => ({
  default: ({ movies }: { movies: MovieProps[] }) => (
    <div data-testid="list">{String(movies.length)}</div>
  ),
}));

vi.mock('./Pagination', () => ({
  default: ({
    currentPage,
    totalPages,
    onChange,
  }: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
  }) => (
    <div>
      <div data-testid="pagination-state">{`${currentPage}/${totalPages}`}</div>
      <button onClick={() => onChange(2)}>go-page-2</button>
      <button onClick={() => onChange(1)}>go-page-1</button>
    </div>
  ),
}));

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/thunks', () => ({
  fetchMoviesThunk: vi.fn(),
}));

const mockedUseAppDispatch = vi.mocked(useAppDispatch);
const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedFetchMoviesThunk = vi.mocked(fetchMoviesThunk);

const dispatchMock = vi.fn();

const state: RootState = {
  auth: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  movies: {
    movies: [] as MovieProps[],
    filteredCount: undefined as number | undefined,
    loading: false,
    error: null as string | null,
  },
};

function LocationState() {
  const location = useLocation();

  return <div data-testid="location-search">{location.search}</div>;
}

function renderMovies(initialPath = '/movies') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/movies"
          element={
            <>
              <Movies />
              <LocationState />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('Movies', () => {
  beforeEach(() => {
    dispatchMock.mockReset();
    mockedFetchMoviesThunk.mockReset();
    state.movies.movies = [];
    state.movies.filteredCount = undefined;
    state.movies.loading = false;
    state.movies.error = null;

    mockedUseAppDispatch.mockReturnValue(dispatchMock);
    mockedUseAppSelector.mockImplementation((selector) => selector(state));
    mockedFetchMoviesThunk.mockImplementation(
      () =>
        (() => Promise.resolve(undefined)) as unknown as ReturnType<
          typeof fetchMoviesThunk
        >
    );
  });

  test('renders loading state', () => {
    state.movies.loading = true;

    renderMovies();

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('renders error state', () => {
    state.movies.error = 'Failed request';

    renderMovies();

    expect(screen.getByText('Error: Failed request')).toBeTruthy();
  });

  test('dispatches fetchMoviesThunk with URL params and page offset', () => {
    renderMovies(
      '/movies?search=matrix&filter=drama&sortBy=release_date&sortOrder=desc&page=3'
    );

    expect(mockedFetchMoviesThunk).toHaveBeenCalledWith({
      search: 'matrix',
      filter: 'drama',
      sortBy: 'release_date',
      sortOrder: 'desc',
      offset: 20,
      limit: 10,
    });
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test('updates query page when pagination onChange is triggered', async () => {
    const user = userEvent.setup();
    state.movies.filteredCount = 25;

    renderMovies('/movies');

    await user.click(screen.getByRole('button', { name: 'go-page-2' }));

    expect(screen.getByTestId('location-search').textContent).toContain(
      'page=2'
    );
  });

  test('removes invalid page param when total pages are lower', async () => {
    state.movies.filteredCount = 5;

    renderMovies('/movies?page=3');

    expect(screen.getByTestId('location-search').textContent).toBe('');
  });
});
