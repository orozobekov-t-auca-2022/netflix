import { Button } from '@mui/material';

function LoginButton() {
  return (
    <Button
      variant="contained"
      type="submit"
      sx={{
        color: 'var(--text-color)',
        backgroundColor: 'var(--primary-color)',
        width: '182px',
        height: '57px',
        fontWeight: 500,
        fontSize: 20,
        leadingTrim: 'NONE',
        lineHeight: '100%',
        letterSpacing: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
    >
      Login
    </Button>
  );
}

export default LoginButton;
