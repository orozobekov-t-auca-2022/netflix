import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from '../MovieForm.module.css';

const genres = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'romance', label: 'Romance' },
];

interface MovieFormGenreDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

function MovieFormGenreDropdown({
  value,
  onChange,
}: MovieFormGenreDropdownProps) {
  return (
    <>
      <span className={styles.inputLabel}>genre</span>
      <FormControl fullWidth>
        <InputLabel id="genre-label" className={styles.inputLabel}>
          Genre
        </InputLabel>
        <Select
          value={value}
          onChange={(event) => onChange(event.target.value as string)}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.value} value={genre.value}>
              {genre.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default MovieFormGenreDropdown;
