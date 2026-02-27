import { createSlice } from '@reduxjs/toolkit';
import { deleteMovie, fetchMovies } from './moviesThunk';
import type { RootState } from '../store';
import type { MovieProps } from '../../pages/MoviesList/type';

interface MoviesState {
  movies: MovieProps[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch movies';
      })
      .addCase(deleteMovie.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to delete movie';
      });
  },
});

export default moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;
export const selectMovieById = (state: RootState, id: number) =>
  state.movies.movies.find((movie) => movie.id === id);
