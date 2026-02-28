import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from '../MovieForm.module.css';

interface MovieFormInputDateProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

function MovieFormInputDate({
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: MovieFormInputDateProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputType: 'text' | 'date' =
    isFocused || Boolean(value) ? 'date' : 'text';

  return (
    <div className={styles.inputField}>
      <span className={styles.inputLabel}>{label}</span>
      <TextField
        type={inputType}
        required={required}
        value={value}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => onChange(event.target.value)}
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
      />
    </div>
  );
}

export default MovieFormInputDate;
