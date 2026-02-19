import { Button } from '@mui/material';

function SearchButton() {
  return (
    <Button
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
