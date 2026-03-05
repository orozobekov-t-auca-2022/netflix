import { Button } from '@mui/material';

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outlined"
      sx={{
        color: 'var(--primary-color)',
        border: '1px solid var(--primary-color)',
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
      onClick={onClick}
    >
      Reset
    </Button>
  );
}

export default ResetButton;
