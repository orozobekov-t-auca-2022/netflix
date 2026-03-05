import styles from '../MovieDetails.module.css';

function MovieDetailsOverview({ overview }: { overview: string }) {
  return (
    <div className={styles.overview}>
      <p>{overview}</p>
    </div>
  );
}

export default MovieDetailsOverview;
