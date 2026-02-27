import { TextField } from '@mui/material';
import styles from '../MovieForm.module.css';

function MovieFormOverview() {
  return (
    <div>
      <span className={styles.inputLabel}>overview</span>
      <TextField style={{ width: '100%', height: '197px' }} />
    </div>
  );
}

export default MovieFormOverview;
