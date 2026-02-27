import styles from './MovieTile.module.css';

function Info({
  title,
  year,
  genres,
}: {
  title: string;
  year: number;
  genres: string[];
}) {
  return (
    <>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.yearContainer}>
          <span className={styles.year}>{year}</span>
        </div>
      </div>
      <p className={styles.genres}>{genres.map((genre) => genre).join(', ')}</p>
    </>
  );
}

export default Info;
