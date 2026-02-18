import { Button } from '@mui/material';

function AddMovieButton() {
  return (
    <Button
      variant="contained"
      startIcon={<span>+</span>}
      sx={{
        backgroundColor: 'rgba(96, 96, 96, 0.68)',
        color: 'var(--primary-color)',
        width: '170px',
        height: '46px',
        minWidth: '170px',
        minHeight: '46px',
        px: '0',
        py: '0',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '100%',
        letterSpacing: '0px',
        textAlign: 'right',
        textTransform: 'uppercase',
      }}
    >
      add movie
    </Button>
  );
}

export default AddMovieButton;
