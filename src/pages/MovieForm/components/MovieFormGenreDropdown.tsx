import {
  Checkbox,
  FormControl,
  FormHelperText,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import styles from '../MovieForm.module.css';
import { genres } from '../../../constants/genres';

interface MovieFormGenreDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}

function MovieFormGenreDropdown({
  value,
  onChange,
  error = false,
}: MovieFormGenreDropdownProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;
    onChange(
      typeof selectedValue === 'string'
        ? selectedValue.split(',')
        : selectedValue
    );
  };

  return (
    <div className={styles.inputField}>
      <span className={styles.inputLabel}>genre</span>
      <FormControl error={error}>
        <Select
          labelId="genre-label"
          multiple
          value={value}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return 'Select genre';
            }

            return genres
              .filter((genre) => selected.includes(genre))
              .join(', ');
          }}
          sx={{
            backgroundColor: 'rgba(50, 50, 50, 0.95)',
            borderRadius: '4px',
            color: '#fff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? 'var(--primary-color)' : '#555',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? 'var(--primary-color)' : '#888',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: error ? 'var(--primary-color)' : '#fff',
              },
            '& .MuiSelect-icon': {
              color: 'var(--primary-color)',
              fontSize: '30px',
            },
          }}
        >
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              <Checkbox checked={value.includes(genre)} />
              <ListItemText primary={genre} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>Select at least one genre</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default MovieFormGenreDropdown;
