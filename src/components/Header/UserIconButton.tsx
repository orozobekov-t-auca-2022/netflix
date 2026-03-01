import { Button } from '@mui/material';

function UserIconButton({ onClick }: { onClick: () => void }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    return null;
  }

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: 'rgba(96, 96, 96, 0.68)',
        color: 'var(--primary-color)',
        width: '45px',
        height: '45px',
        minWidth: '45px',
        minHeight: '45px',
        px: '0',
        py: '0',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '100%',
        letterSpacing: '0px',
        textAlign: 'right',
        textTransform: 'uppercase',
        borderRadius: '50%',
      }}
    >
      {user !== null && user !== undefined && user.name
        ? user.name.charAt(0).toUpperCase()
        : 'U'}
    </Button>
  );
}

export default UserIconButton;
