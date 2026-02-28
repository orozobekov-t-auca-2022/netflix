import styles from './Header.module.css';
import AddMovieButton from './AddMovieButton';
import UserIconButton from './UserIconButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';
import { useState } from 'react';
import UserTooltip from './UserTooltip';

function Header() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const goToAddMovieForm = () => {
    navigate('/create-movie');
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.navigationHeader}>
        <Link to="/" className={styles.logo}>
          <span className={styles.netflix}>netflix</span>
          <span className={styles.roulette}>roulette</span>
        </Link>
        <div className={styles.buttons}>
          {isAdmin && <AddMovieButton onClick={() => goToAddMovieForm()} />}
          {user && (
            <UserIconButton onClick={() => setShowUserMenu(!showUserMenu)} />
          )}
          {showUserMenu && (
            <UserTooltip
              onClick={() => setShowUserMenu(false)}
              onClose={() => setShowUserMenu(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
