import styles from './HomeIntro.module.css';
import SearchBar from './SearchBar';

function HomeIntro() {
  return (
    <div className={styles.navigation}>
      <div className={styles.navigationContent}>
        <div className={styles.navigationBody}>
          <h1 className={styles.headerSlogan}>FIND YOUR MOVIE</h1>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default HomeIntro;
