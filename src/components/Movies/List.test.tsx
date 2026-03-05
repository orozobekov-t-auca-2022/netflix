import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { MovieProps } from '../../pages/MoviesList/type';
import List from './List';

vi.mock('../MovieTile', () => ({
  default: ({ movie }: { movie: MovieProps }) => (
    <div data-testid="movie-tile">{movie.title}</div>
  ),
}));

function createMovie(id: number, title: string): MovieProps {
  return {
    id,
    title,
    tagline: '',
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
}

describe('List', () => {
  test('renders loading state', () => {
    render(<List movies={[]} loading />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(screen.queryAllByTestId('movie-tile')).toHaveLength(0);
  });

  test('renders error state', () => {
    render(<List movies={[]} error="Failed request" />);

    expect(screen.getByText('Error: Failed request')).toBeTruthy();
    expect(screen.queryAllByTestId('movie-tile')).toHaveLength(0);
  });

  test('renders a tile for each movie', () => {
    const movies = [createMovie(1, 'Movie A'), createMovie(2, 'Movie B')];

    render(<List movies={movies} />);

    const tiles = screen.getAllByTestId('movie-tile');
    expect(tiles).toHaveLength(2);
    expect(screen.getByText('Movie A')).toBeTruthy();
    expect(screen.getByText('Movie B')).toBeTruthy();
  });

  test('renders empty list when movies are empty', () => {
    render(<List movies={[]} />);

    expect(screen.queryAllByTestId('movie-tile')).toHaveLength(0);
  });
});
