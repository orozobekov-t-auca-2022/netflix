import { TextField } from '@mui/material';
import styles from '../MovieForm.module.css';

function MovieFromInputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <span className={styles.inputLabel}>{label}</span>
      <TextField placeholder={placeholder} style={{ width: '100%' }} />
    </div>
  );
}

export default MovieFromInputField;
