import { TextField } from '@mui/material';
import styles from '../Login.module.css';
import type { ChangeEvent } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

function EmailInput({ value, onChange, error }: EmailInputProps) {
  return (
    <TextField
      className={styles.input}
      value={value}
      id="email"
      name="email"
      placeholder="enter email"
      onChange={onChange}
      error={!!error}
      sx={{
        input: {
          color: 'var(--text-color)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1,
          letterSpacing: 0,
        },
      }}
    />
  );
}

export default EmailInput;
