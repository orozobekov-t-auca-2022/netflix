import { useNavigate } from 'react-router-dom';
import styles from './MovieTile.module.css';

function TooltipContent({
  movieId,
  onClose,
  onDelete,
}: {
  movieId: number;
  onClose: () => void;
  onDelete: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.tooltipContent} onClick={(e) => e.stopPropagation()}>
      <p
        className={styles.closeIcon}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕
      </p>
      <ul className={styles.tooltipList}>
        <li
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/${movieId}/edit-movie`);
            onClose();
          }}
          style={{ textDecoration: 'none', color: 'var(--text-color)' }}
        >
          edit
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          delete
        </li>
      </ul>
    </div>
  );
}

export default TooltipContent;
