import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MovieFormData } from '../types/movieForm';
import type { MovieProps } from '../pages/MoviesList/type';

interface FetchMoviesParams {
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: string;
  offset?: number;
  limit?: number;
}

interface FetchMoviesResponse {
  data: MovieProps[];
  filteredCount?: number;
  totalAmount?: number;
}

export const fetchMoviesThunk = createAsyncThunk(
  'movies/fetchMovies',
  async (params: FetchMoviesParams = {}, { rejectWithValue }) => {
    try {
      const offset = typeof params.offset === 'number' ? params.offset : 0;
      const limit = typeof params.limit === 'number' ? params.limit : 10;
      const queryParams = new URLSearchParams();

      if (params.filter) queryParams.append('filter', params.filter);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      if (params.search) {
        queryParams.append('offset', '0');
        queryParams.append('limit', '1000');
      } else {
        queryParams.append('offset', String(offset));
        queryParams.append('limit', String(limit));
      }

      const url = `${import.meta.env.VITE_API_KEY}/movies${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data: FetchMoviesResponse = await response.json();

      if (params.search) {
        const normalizedSearch = params.search.toLowerCase();
        const filteredMovies = data.data.filter((movie) => {
          const title = movie.title.toLowerCase();
          const overview = movie.overview.toLowerCase();

          return (
            title.includes(normalizedSearch) ||
            overview.includes(normalizedSearch)
          );
        });

        return {
          movies: filteredMovies.slice(offset, offset + limit),
          filteredCount: filteredMovies.length,
        };
      }

      return {
        movies: data.data,
        filteredCount:
          data.filteredCount ?? data.totalAmount ?? data.data.length,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const deleteMovieThunk = createAsyncThunk(
  'movies/deleteMovie',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/movies/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/movies/${id}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const addMovieThunk = createAsyncThunk(
  'movies/createMovie',
  async (movieData: MovieFormData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error('Failed to create movie');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const updateMovieThunk = createAsyncThunk(
  'movies/updateMovie',
  async (
    { id, movieData }: { id: number; movieData: MovieFormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/movies/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, ...movieData }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update movie');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const getUserThunk = createAsyncThunk(
  'auth/getUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);
