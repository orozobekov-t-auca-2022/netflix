import styles from './Movies.module.css';

function FilterBar() {
  return (
    <ul className={styles.filterGenreBar}>
      <li>
        <a href="#">All</a>
      </li>
      <li>
        <a href="#">Documentary</a>
      </li>
      <li>
        <a href="#">Comedy</a>
      </li>
      <li>
        <a href="#">Horror</a>
      </li>
      <li>
        <a href="#">Crime</a>
      </li>
    </ul>
  );
}

export default FilterBar;
