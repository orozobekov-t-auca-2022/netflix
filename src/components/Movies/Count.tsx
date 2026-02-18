import styles from './Movies.module.css';

function Count({ count }: { count: number }) {
  return (
    <div className={styles.moviesCount}>
      <span className={styles.moviesCountText}>Found {count} movies</span>
    </div>
  );
}

export default Count;
