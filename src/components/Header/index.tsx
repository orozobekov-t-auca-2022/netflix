import HeaderTitle from './HeaderTitle';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.navigation}>
      <div className={styles.navigationContent}>
        <HeaderTitle />
        <div className={styles.navigationBody}>
          <h1 className={styles.headerSlogan}>FIND YOUR MOVIE</h1>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
