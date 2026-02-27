import { Button } from '@mui/material';
import styles from './index.module.css';

function ConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className={styles.confirmContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className={styles.confirmCloseIcon}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕
      </p>
      <div className={styles.confirmContent}>
        <h2 className={styles.confirmTitle}>Delete Movie</h2>
        <p className={styles.confirmText}>
          Are you sure you want to delete this movie?
        </p>
        <div className={styles.confirmButtonWrappper}>
          <Button
            variant="contained"
            onClick={onConfirm}
            style={{
              width: '180px',
              height: '57px',
              backgroundColor: 'var(--primary-color)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              textAlign: 'center',
              textTransform: 'uppercase',
              marginLeft: 'auto',
            }}
          >
            confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
