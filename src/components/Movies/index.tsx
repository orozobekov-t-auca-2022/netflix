import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Count from './Count';
import FilterBar from './FilterBar';
import List from './List';
import { fetchMoviesThunk } from '../../store/thunks';
import {
  selectMovies,
  selectMoviesLoading,
  selectMoviesError,
} from '../../store/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function Movies() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const movies = useAppSelector(selectMovies);
  const loading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);

  useEffect(() => {
    const search = searchParams.get('search') || undefined;
    const filter = searchParams.get('filter') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = searchParams.get('sortOrder') || undefined;

    dispatch(fetchMoviesThunk({ search, filter, sortBy, sortOrder }));
  }, [dispatch, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="moviesList">
      <FilterBar />
      <Count count={movies.length} />
      <List movies={movies} />
    </div>
  );
}

export default Movies;
