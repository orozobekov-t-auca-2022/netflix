import Header from '../../components/Header';
import Movies from '../../components/Movies';
import styles from './MoviesList.module.css';
import MovieMap from '../../assets/MovieMap.png';
import { useEffect, useState } from 'react';
import type { MoviesListProps } from './type';

function MoviesList() {
  const [movies, setMovies] = useState<MoviesListProps['movies']>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_KEY + '/movies');
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.moviesBackground}>
          <img
            className={styles.moviesBackgroundPhoto}
            src={MovieMap}
            alt="Poster of available movies"
          />
        </div>
        <div className={styles.container}>
          <Header />
          <Movies movies={movies} />
        </div>
      </div>
    </>
  );
}

export default MoviesList;
