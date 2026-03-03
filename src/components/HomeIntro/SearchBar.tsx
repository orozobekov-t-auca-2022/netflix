import { TextField } from '@mui/material';
import SearchButton from './SearchButton';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedQuery = searchQuery.trim();

    if (!normalizedQuery) {
      navigate('/');
      return;
    }

    navigate(`/?search=${encodeURIComponent(normalizedQuery)}`);
  };

  return (
    <form
      style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
      onSubmit={handleSubmit}
    >
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <SearchButton type="submit" />
    </form>
  );
}

export default SearchBar;
