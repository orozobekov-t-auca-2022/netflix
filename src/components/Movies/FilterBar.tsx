import { genres } from '../../constants/genres';
import styles from './Movies.module.css';
import { useSearchParams } from 'react-router-dom';

function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const genresWithAll = ['All', ...genres];

  const currentFilter = (searchParams.get('filter') || 'all').toLowerCase();

  const handleGenreClick = (genre: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('page');

    if (genre.toLowerCase() === 'all') {
      nextParams.delete('filter');
    } else {
      nextParams.set('filter', genre.toLowerCase());
    }

    setSearchParams(nextParams);
  };

  return (
    <ul className={styles.filterGenreBar}>
      {genresWithAll.map((genre) => (
        <li key={genre}>
          <a
            className={
              currentFilter === genre.toLowerCase() ||
              (genre === 'All' && !searchParams.get('filter'))
                ? styles.active
                : undefined
            }
            href="#"
            onClick={(event) => {
              event.preventDefault();
              handleGenreClick(genre);
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default FilterBar;
