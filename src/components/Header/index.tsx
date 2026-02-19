import styles from './Header.module.css';
import AddMovieButton from './AddMovieButton';
import UserIconButton from './UserIconButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';

function Header() {
  const { user, isAdmin } = useAuth();
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.navigationHeader}>
        <Link to="/" className={styles.logo}>
          <span className={styles.netflix}>netflix</span>
          <span className={styles.roulette}>roulette</span>
        </Link>
        <div className={styles.buttons}>
          {isAdmin && <AddMovieButton />}
          {user && <UserIconButton />}
        </div>
      </div>
    </div>
  );
}

export default Header;
