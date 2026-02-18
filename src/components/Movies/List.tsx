import type { MoviesListProps } from '../../pages/MoviesList/type';
import Card from './Card';
import styles from './Movies.module.css';

function List({ movies }: MoviesListProps) {
  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default List;
