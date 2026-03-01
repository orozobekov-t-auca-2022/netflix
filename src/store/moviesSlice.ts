import { createSlice } from '@reduxjs/toolkit';
import { deleteMovieThunk, fetchMoviesThunk } from './thunks';
import type { RootState } from '.';
import type { MovieProps } from '../pages/MoviesList/type';

interface MoviesState {
  movies: MovieProps[];
  loading: boolean;
  error: string | null;
  filteredCount?: number;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  filteredCount: undefined,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.filteredCount = action.payload.filteredCount;
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch movies';
      })
      .addCase(deleteMovieThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteMovieThunk.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );
      })
      .addCase(deleteMovieThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to delete movie';
      });
  },
});

export default moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesFilteredCount = (state: RootState) =>
  state.movies.filteredCount;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;
export const selectMovieById = (state: RootState, id: number) =>
  state.movies.movies.find((movie) => movie.id === id);
