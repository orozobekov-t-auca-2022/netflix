import { TextField } from '@mui/material';
import styles from '../Login.module.css';
import type { ChangeEvent } from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  return (
    <TextField
      className={styles.input}
      value={value}
      id="password"
      name="password"
      type="password"
      placeholder="enter password"
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

export default PasswordInput;
