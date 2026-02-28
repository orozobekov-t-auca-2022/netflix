import styles from '../MoviesList.module.css';

function CongratulationsModule({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className={styles.congratulationsOverlay} onClick={onClose}>
      <div
        className={styles.congratulationsModule}
        onClick={(event) => event.stopPropagation()}
      >
        <p className={styles.movieFormcloseIcon} onClick={onClose}>
          ✕
        </p>
        <div className={styles.checkmark}>
          <svg
            width="40"
            height="32"
            viewBox="0 0 40 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 17.3347L12.6175 27.5L37.5 2.5"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className={styles.congratulationsTitle}>CONGRATULATIONS!</h2>
        <p className={styles.congratulationsText}>
          The movie has been added to database successfully
        </p>
      </div>
    </div>
  );
}

export default CongratulationsModule;
