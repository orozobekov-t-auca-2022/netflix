import styles from '../MovieDetails.module.css';

function MovieDetailsDate({
  releaseDate,
  duration,
}: {
  releaseDate: string;
  duration: number;
}) {
  return (
    <div className={styles.movieDetailsDate}>
      <h3>{releaseDate}</h3>
      <h3>{duration}</h3>
    </div>
  );
}

export default MovieDetailsDate;
