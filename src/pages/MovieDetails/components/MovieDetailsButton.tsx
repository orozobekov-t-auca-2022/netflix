import { Button } from '@mui/material';

function MovieDetailsButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      style={{
        width: '177px',
        height: '57px',
        backgroundColor: 'rgba(96, 96, 96, 0.68)',
        color: 'var(--primary-color)',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 100,
        letterSpacing: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Button>
  );
}

export default MovieDetailsButton;
