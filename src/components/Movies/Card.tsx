import styles from './Movies.module.css';
import type { MovieProps } from '../../pages/MoviesList/type';

function Card({ movie }: { movie: MovieProps }) {
  const { title, release_date, genres, poster_path } = movie;
  const year = new Date(release_date).getFullYear();
  return (
    <div className={styles.card}>
      <img src={poster_path} alt={title} className={styles.poster} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.yearContainer}>
          <span className={styles.year}>{year}</span>
        </div>
      </div>
      <p className={styles.genres}>{genres}</p>
    </div>
  );
}

export default Card;
