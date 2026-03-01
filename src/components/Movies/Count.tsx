import styles from './Movies.module.css';

function Count({ count }: { count: number }) {
  return (
    <div className={styles.moviesCount}>
      <span className={styles.moviesCountText}>
        {count} {count === 1 ? 'movie' : 'movies'} found
      </span>
    </div>
  );
}

export default Count;
