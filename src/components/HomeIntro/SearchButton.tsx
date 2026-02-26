import { Button } from '@mui/material';

function SearchButton({ type }: { type?: 'submit' }) {
  return (
    <Button
      type={type}
      variant="contained"
      sx={{
        width: '233px',
        height: '57px',
        backgroundColor: 'var(--primary-color)',
      }}
    >
      search
    </Button>
  );
}

export default SearchButton;
