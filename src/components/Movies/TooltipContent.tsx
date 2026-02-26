import styles from './Movies.module.css';

function TooltipContent({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.tooltipContent}>
      <p className={styles.closeIcon} onClick={onClose}>
        ✕
      </p>
      <ul className={styles.tooltipList}>
        <li>edit</li>
        <li>delete</li>
      </ul>
    </div>
  );
}

export default TooltipContent;
