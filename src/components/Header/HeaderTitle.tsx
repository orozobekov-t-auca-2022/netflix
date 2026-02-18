import styles from './Header.module.css';
import AddMovieButton from './AddMovieButton';
import UserIconButton from './UserIconButton';

function HeaderTitle() {
  return (
    <div className={styles.navigationHeader}>
      <div className={styles.logo}>
        <span className={styles.netflix}>netflix</span>
        <span className={styles.roulette}>roulette</span>
      </div>
      <div className={styles.buttons}>
        <AddMovieButton />
        <UserIconButton />
      </div>
    </div>
  );
}

export default HeaderTitle;
