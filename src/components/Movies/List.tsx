import type { MoviesListProps } from '../../pages/MoviesList/type';
import MovieTile from '../MovieTile';
import styles from './Movies.module.css';

function List({ movies }: MoviesListProps) {
  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <MovieTile key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default List;
