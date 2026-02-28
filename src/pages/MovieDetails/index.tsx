import MovieDetailsButton from './components/MovieDetailsButton';
import MovieDetailsDate from './components/MovieDetailsDate';
import MovieDetailsGenres from './components/MovieDetailsGenres';
import MovieDetailsHeader from './components/MovieDetailsHeader';
import MovieDetailsOverview from './components/MovieDetailsOverview';
import styles from './MovieDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';
import { useEffect, useState } from 'react';
import ConfirmModal from '../../components/common/ConfirmModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteMovieThunk, fetchMovieById } from '../../store/thunks';
import { selectMovieById } from '../../store/moviesSlice';

function MovieDetails() {
  const [deleteClick, setDeleteClick] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { movieId } = useParams<{ movieId: string }>();

  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) =>
    selectMovieById(state, Number(movieId))
  );
  const loading = useAppSelector((state) => state.movies.loading);

  useEffect(() => {
    if (movieId && !movie) {
      dispatch(fetchMovieById(Number(movieId)));
    }
  }, [dispatch, movieId, movie]);

  if (loading || !movie) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    navigate(-1);
  };

  const goToEditPage = () => {
    navigate(`/${movieId}/edit-movie`);
  };

  return (
    <div className={styles.movieDetails}>
      <div className={styles.container}>
        <div className={styles.movieDetailsPoster}>
          <MovieDetailsButton onClick={goBack}>Go Back</MovieDetailsButton>
          <img className={styles.poster} src={movie.poster_path} alt="" />
        </div>
        <div className={styles.movieDetailsInfo}>
          <MovieDetailsHeader
            name={movie.title}
            vote_average={movie.vote_average}
          />
          <MovieDetailsGenres genres={movie.genres} />
          <MovieDetailsDate
            releaseDate={movie.release_date}
            duration={movie.runtime}
          />
          <MovieDetailsOverview overview={movie.overview} />
          {isAdmin && (
            <div className={styles.editAndDeleteWrapper}>
              <div className={styles.editAndDelete}>
                <MovieDetailsButton onClick={goToEditPage}>
                  Edit
                </MovieDetailsButton>
                <MovieDetailsButton onClick={() => setDeleteClick(true)}>
                  Delete
                </MovieDetailsButton>
              </div>
            </div>
          )}
        </div>
        {deleteClick && (
          <ConfirmModal
            onClose={() => setDeleteClick(false)}
            onConfirm={() => {
              setDeleteClick(false);
              dispatch(deleteMovieThunk(Number(movieId)));
              navigate('/');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
