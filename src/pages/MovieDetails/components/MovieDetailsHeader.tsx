import styles from '../MovieDetails.module.css';

function MovieDetailsHeader({
  name,
  vote_average,
}: {
  name: string;
  vote_average: number;
}) {
  return (
    <div className={styles.movieDetailsHeader}>
      <h2 className={styles.movieDetailsHeaderName}>{name}</h2>
      <div className={styles.movieDetailsHeaderVoteAverage}>
        <span>{vote_average}</span>
      </div>
    </div>
  );
}

export default MovieDetailsHeader;
