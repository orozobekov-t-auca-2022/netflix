import { TextField } from '@mui/material';
import SearchButton from './SearchButton';

function SearchBar() {
  return (
    <form style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
      <TextField
        type="text"
        label="What do you want to watch?"
        variant="outlined"
        sx={{
          maxWidth: '713px',
          width: '100%',
          backgroundColor: 'rgba(50, 50, 50, 0.8)',
          height: '57px',
          borderRadius: '4px',
          input: {
            color: 'var(--primary-color)',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '100%',
            letterSpacing: '0px',
          },
        }}
      />
      <SearchButton />
    </form>
  );
}

export default SearchBar;
