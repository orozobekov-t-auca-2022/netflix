import HeaderTitle from './HeaderTitle';
import SearchBar from './SearchBar';
import styles from './Header.module.css';
import MovieMap from '../../assets/MovieMap.png';

function Header() {
  return (
    <nav className={styles.navigation}>
      <img
        className={styles.moviesBackgroundPhoto}
        src={MovieMap}
        alt="Poster of available movies"
      />
      <HeaderTitle />
      <div className={styles.navigationBody}>
        <h1>FIND YOUR MOViE</h1>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Header;
