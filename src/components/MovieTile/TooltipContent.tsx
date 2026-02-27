import { Link } from 'react-router-dom';
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
        <li>
          <Link
            to={`/${movieId}/edit-movie`}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{ textDecoration: 'none', color: 'var(--text-color)' }}
          >
            edit
          </Link>
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
