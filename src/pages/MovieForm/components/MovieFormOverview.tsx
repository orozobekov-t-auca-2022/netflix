import { TextField } from '@mui/material';
import styles from '../MovieForm.module.css';

function MovieFormOverview({
  placeholder,
  required = false,
  type = 'text',
  value,
  onChange,
}: {
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.inputField}>
      <span className={styles.inputLabel}>overview</span>
      <TextField
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        multiline
        minRows={6}
        sx={{
          backgroundColor: 'rgba(50, 50, 50, 0.95)',
          borderRadius: '8px',
          width: '100%',

          '& .MuiInputBase-input': {
            color: '#fff',
            height: '197px',
          },

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#555',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888',
          },

          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#fff',
            },

          '& .MuiInputBase-input::placeholder': {
            color: '#aaa',
            opacity: 1,
          },
        }}
      />
    </div>
  );
}

export default MovieFormOverview;
