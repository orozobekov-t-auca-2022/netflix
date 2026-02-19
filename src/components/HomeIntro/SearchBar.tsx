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

          '& .MuiOutlinedInput-root': {
            height: '57px',
            backgroundColor: 'rgba(50, 50, 50, 0.8)',
            borderRadius: '4px',
            alignItems: 'center',
          },

          '& .MuiInputBase-input': {
            color: 'var(--text-color)',
            fontWeight: 400,
            fontSize: '20px',
            padding: '0 14px',
          },

          '& .MuiInputLabel-root': {
            color: 'var(--text-color)',
          },
        }}
      />

      <SearchButton />
    </form>
  );
}

export default SearchBar;
