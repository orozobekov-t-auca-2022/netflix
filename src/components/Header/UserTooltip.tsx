import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { type User } from '../../types/user';
import { useAuth } from '../../provider/useAuth';

function UserTooltip({
  onClick,
  onClose,
}: {
  onClick: () => void;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  let user: User | null = null;
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch {
      user = null;
    }
  }

  return (
    <div className={styles.tooltipContent} onClick={(e) => e.stopPropagation()}>
      <ul className={styles.tooltipList}>
        <li
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          style={{ textDecoration: 'none', color: 'var(--text-color)' }}
        >
          {user?.name}
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            logout();
            onClose();
            navigate('/login', { replace: true });
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default UserTooltip;
