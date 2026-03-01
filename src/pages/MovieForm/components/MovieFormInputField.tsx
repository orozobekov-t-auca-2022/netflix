import { TextField } from '@mui/material';
import styles from '../MovieForm.module.css';

function MovieFromInputField({
  label,
  placeholder,
  required = false,
  type = 'text',
  inputProps,
  value,
  onChange,
  error = false,
  helperText = '',
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'number' | 'date' | 'url';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}) {
  return (
    <div className={styles.inputField}>
      <div>
        <span className={styles.inputLabel}>{label}</span>
        {error && <span className={styles.error}> {helperText}</span>}
      </div>
      <TextField
        type={type}
        required={required}
        placeholder={placeholder}
        sx={{
          backgroundColor: 'rgba(50, 50, 50, 0.95)',
          borderRadius: '8px',

          '& .MuiInputBase-input': {
            color: '#fff',
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
        inputProps={inputProps}
        value={value}
        error={error}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default MovieFromInputField;
