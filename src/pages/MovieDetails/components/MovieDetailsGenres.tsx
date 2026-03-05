import styles from '../MovieDetails.module.css';

function MovieDetailsGenres({ genres }: { genres: string[] }) {
  return (
    <div className={styles.genres}>
      {genres.map((genre, index) => {
        if (index === genres.length - 1) {
          return <span key={genre}>{genre}</span>;
        }
        return <span key={genre}>{genre}, </span>;
      })}
    </div>
  );
}

export default MovieDetailsGenres;
