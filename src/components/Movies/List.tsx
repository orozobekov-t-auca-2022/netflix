import type { MoviesListProps } from '../../pages/MoviesList/type';
import MovieTile from '../MovieTile';
import styles from './Movies.module.css';

interface ListProps extends MoviesListProps {
  loading?: boolean;
  error?: string | null;
}

function List({ movies, loading = false, error = null }: ListProps) {
  if (loading) {
    return <div className={styles.list}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.list}>Error: {error}</div>;
  }

  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <MovieTile key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default List;
