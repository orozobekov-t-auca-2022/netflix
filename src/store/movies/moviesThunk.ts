import { createAsyncThunk } from '@reduxjs/toolkit';

interface FetchMoviesParams {
  search?: string;
  filter?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: FetchMoviesParams = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.search) {
        queryParams.append('search', params.search);
        queryParams.append('searchBy', 'title');
      }
      if (params.filter) queryParams.append('filter', params.filter);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${import.meta.env.VITE_API_KEY}/movies${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
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
