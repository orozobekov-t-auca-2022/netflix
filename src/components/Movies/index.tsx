import type { MoviesListProps } from '../../pages/MoviesList/type';
import Count from './Count';
import FilterBar from './FilterBar';
import List from './List';

function Movies({ movies }: MoviesListProps) {
  return (
    <div className="moviesList">
      <FilterBar />
      <Count count={movies.length} />
      <List movies={movies} />
    </div>
  );
}

export default Movies;
