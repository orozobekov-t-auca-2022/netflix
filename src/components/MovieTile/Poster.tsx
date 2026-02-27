import styles from './MovieTile.module.css';

function Poster({
  poster_path,
  title,
}: {
  poster_path: string;
  title: string;
}) {
  return <img src={poster_path} alt={title} className={styles.poster} />;
}

export default Poster;
