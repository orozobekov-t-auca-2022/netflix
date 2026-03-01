import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { type User } from '../../types/user';

function UserTooltip({
  onClick,
  onClose,
}: {
  onClick: () => void;
  onClose: () => void;
}) {
  const navigate = useNavigate();
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
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            onClose();
            navigate('/login');
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default UserTooltip;
