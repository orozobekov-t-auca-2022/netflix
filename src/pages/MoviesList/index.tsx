import Movies from '../../components/Movies';
import styles from './MoviesList.module.css';
import MovieMap from '../../assets/MovieMap.png';
import HomeIntro from '../../components/HomeIntro';

function MoviesList() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.moviesBackground}>
          <img
            className={styles.moviesBackgroundPhoto}
            src={MovieMap}
            alt="Poster of available movies"
          />
        </div>
        <div className={styles.container}>
          <HomeIntro />
          <Movies />
        </div>
      </div>
    </>
  );
}

export default MoviesList;
