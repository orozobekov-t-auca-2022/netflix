import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Count from './Count';
import FilterBar from './FilterBar';
import List from './List';
import Pagination from './Pagination';
import { fetchMoviesThunk } from '../../store/thunks';
import {
  selectMovies,
  selectMoviesFilteredCount,
  selectMoviesLoading,
  selectMoviesError,
} from '../../store/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const MOVIES_PER_PAGE = 10;

function Movies() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const movies = useAppSelector(selectMovies);
  const filteredCount = useAppSelector(selectMoviesFilteredCount);
  const loading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);
  const pageFromUrl = Number(searchParams.get('page') || '1');
  const currentPage =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0
      ? Math.floor(pageFromUrl)
      : 1;
  const totalPages = Math.max(
    1,
    Math.ceil((filteredCount ?? movies.length) / MOVIES_PER_PAGE)
  );

  useEffect(() => {
    const search = searchParams.get('search') || undefined;
    const filter = searchParams.get('filter') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = searchParams.get('sortOrder') || undefined;
    const offset = (currentPage - 1) * MOVIES_PER_PAGE;

    dispatch(
      fetchMoviesThunk({
        search,
        filter,
        sortBy,
        sortOrder,
        offset,
        limit: MOVIES_PER_PAGE,
      })
    );
  }, [currentPage, dispatch, searchParams]);

  useEffect(() => {
    if (currentPage <= totalPages) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    if (totalPages <= 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(totalPages));
    }
    setSearchParams(nextParams);
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    if (page <= 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(page));
    }
    setSearchParams(nextParams);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="moviesList">
      <FilterBar />
      <Count count={filteredCount ?? movies.length} />
      <List movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Movies;
