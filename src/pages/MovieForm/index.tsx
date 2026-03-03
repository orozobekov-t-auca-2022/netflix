import { Button } from '@mui/material';
import { useEffect, useState, type FormEvent } from 'react';
import MovieFromInputField from './components/MovieFormInputField';
import styles from './MovieForm.module.css';
import MovieFormOverview from './components/MovieFormOverview';
import { useNavigate, useParams } from 'react-router-dom';
import MovieFormGenreDropdown from './components/MovieFormGenreDropdown';
import MovieFormInputDate from './components/MovieFormInputDate';
import {
  addMovieThunk,
  fetchMovieById,
  fetchMoviesThunk,
  updateMovieThunk,
} from '../../store/thunks';
import type { MovieFormData } from '../../types/movieForm';
import { useAppDispatch } from '../../store/hooks';

const createEmptyFormData = (): MovieFormData => ({
  title: '',
  poster_path: '',
  release_date: '',
  vote_average: 0,
  runtime: 0,
  overview: '',
  genres: [],
});

type FieldErrorMessages = Record<keyof MovieFormData, string>;

const createEmptyErrors = (): FieldErrorMessages => ({
  title: '',
  poster_path: '',
  release_date: '',
  vote_average: '',
  runtime: '',
  overview: '',
  genres: '',
});

function MovieForm({ mode }: { mode: 'create' | 'edit' }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { movieId } = useParams();

  const [formData, setFormData] = useState<MovieFormData>(
    createEmptyFormData()
  );
  const [backup, setBackup] = useState<MovieFormData>(createEmptyFormData());

  useEffect(() => {
    if (mode !== 'edit' || !movieId) return;

    const loadMovieData = async () => {
      try {
        const movieData = await dispatch(
          fetchMovieById(Number(movieId))
        ).unwrap();
        if (movieData) {
          setFormData({
            title: movieData.title,
            poster_path: movieData.poster_path,
            release_date: movieData.release_date,
            vote_average: movieData.vote_average,
            runtime: movieData.runtime,
            overview: movieData.overview,
            genres: movieData.genres,
          });
          setBackup({ ...movieData });
        } else {
          console.error('Movie not found in store');
        }
      } catch (error) {
        console.error('Error loading movie data:', error);
      }
    };

    loadMovieData();
  }, [mode, movieId, dispatch]);

  const [fieldErrors, setFieldErrors] =
    useState<FieldErrorMessages>(createEmptyErrors());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (data: MovieFormData): FieldErrorMessages => {
    const errors: FieldErrorMessages = createEmptyErrors();

    if (!data.title.trim()) errors.title = 'Title is required';
    if (!data.poster_path.trim()) errors.poster_path = 'Poster URL is required';
    if (!data.release_date.trim()) {
      errors.release_date = 'Release date is required';
    }
    if (
      !Number.isFinite(data.vote_average) ||
      data.vote_average <= 0 ||
      data.vote_average > 10
    ) {
      errors.vote_average =
        'Rating must be greater than 0 and less than or equal to 10';
    }
    if (!Number.isFinite(data.runtime) || data.runtime <= 0) {
      errors.runtime = 'Runtime must be greater than 0';
    }
    if (!data.overview.trim()) errors.overview = 'Overview is required';
    if (!data.genres.length) errors.genres = 'Select at least one genre';

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const errors = validateForm(formData);
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);

    if (!hasErrors) {
      if (mode === 'create') {
        await dispatch(addMovieThunk(formData));
        await dispatch(fetchMoviesThunk({})).unwrap();
        resetFormData();
        navigate('/', {
          state: { showCreateSuccess: true },
          replace: false,
        });
      } else if (mode === 'edit') {
        await dispatch(
          updateMovieThunk({ id: Number(movieId), movieData: formData })
        );
        await dispatch(fetchMoviesThunk({})).unwrap();
        navigate('/', {
          state: { showEditSuccess: true },
          replace: false,
        });
      }
    }
  };

  const resetFormData = () => {
    if (mode === 'create') {
      setFormData(createEmptyFormData());
      setFieldErrors(createEmptyErrors());
      setIsSubmitted(false);
    } else if (mode === 'edit') {
      setFormData(backup);
      setFieldErrors(createEmptyErrors());
      setIsSubmitted(false);
    }
  };

  return (
    <div className={styles.movieFormPage}>
      <div className={styles.movieFormContainer}>
        <form className={styles.movieForm} onSubmit={handleSubmit}>
          <h2 className={styles.movieFormTitle}>
            {mode === 'create' ? 'Add New Movie' : 'Edit Movie'}
          </h2>
          <div className={styles.movieFormInputs}>
            <div className={styles.leftColumn}>
              <div>
                <MovieFromInputField
                  label="Title"
                  placeholder="Movie title"
                  type="text"
                  value={formData.title}
                  error={isSubmitted && !!fieldErrors.title}
                  helperText={isSubmitted ? fieldErrors.title : ''}
                  onChange={(value) => {
                    setFormData({ ...formData, title: value });
                    if (fieldErrors.title) {
                      setFieldErrors({ ...fieldErrors, title: '' });
                    }
                  }}
                />
              </div>
              <div>
                <MovieFromInputField
                  label="poster url"
                  placeholder="https://"
                  type="url"
                  value={formData.poster_path}
                  error={isSubmitted && !!fieldErrors.poster_path}
                  helperText={isSubmitted ? fieldErrors.poster_path : ''}
                  onChange={(value) => {
                    setFormData({ ...formData, poster_path: value });
                    if (fieldErrors.poster_path) {
                      setFieldErrors({ ...fieldErrors, poster_path: '' });
                    }
                  }}
                />
              </div>
              <div>
                <MovieFormGenreDropdown
                  value={formData.genres}
                  onChange={(selectedGenres) => {
                    setFormData({ ...formData, genres: selectedGenres });
                    if (selectedGenres.length > 0) {
                      setFieldErrors({ ...fieldErrors, genres: '' });
                    }
                  }}
                  error={isSubmitted && !!fieldErrors.genres}
                  helperText={isSubmitted ? fieldErrors.genres : ''}
                />
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div>
                <MovieFormInputDate
                  label="release date"
                  placeholder="Select Date"
                  value={formData.release_date}
                  error={isSubmitted && !!fieldErrors.release_date}
                  helperText={isSubmitted ? fieldErrors.release_date : ''}
                  onChange={(value) => {
                    setFormData({ ...formData, release_date: value });
                    if (fieldErrors.release_date) {
                      setFieldErrors({ ...fieldErrors, release_date: '' });
                    }
                  }}
                />
              </div>
              <div>
                <MovieFromInputField
                  label="rating"
                  placeholder="7.8"
                  type="number"
                  inputProps={{ min: 0.1, max: 10, step: 0.1 }}
                  value={String(formData.vote_average)}
                  error={isSubmitted && !!fieldErrors.vote_average}
                  helperText={isSubmitted ? fieldErrors.vote_average : ''}
                  onChange={(value) => {
                    setFormData({
                      ...formData,
                      vote_average: parseFloat(value) || 0,
                    });
                    if (fieldErrors.vote_average) {
                      setFieldErrors({ ...fieldErrors, vote_average: '' });
                    }
                  }}
                />
              </div>
              <div>
                <MovieFromInputField
                  label="runtime"
                  placeholder="minutes"
                  type="number"
                  value={String(formData.runtime)}
                  error={isSubmitted && !!fieldErrors.runtime}
                  helperText={isSubmitted ? fieldErrors.runtime : ''}
                  onChange={(value) => {
                    setFormData({ ...formData, runtime: Number(value) || 0 });
                    if (fieldErrors.runtime) {
                      setFieldErrors({ ...fieldErrors, runtime: '' });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.overviewInput}>
            <MovieFormOverview
              placeholder="Movie description"
              type="text"
              value={formData.overview}
              error={isSubmitted && !!fieldErrors.overview}
              helperText={isSubmitted ? fieldErrors.overview : ''}
              onChange={(value) => {
                setFormData({ ...formData, overview: value });
                if (fieldErrors.overview) {
                  setFieldErrors({ ...fieldErrors, overview: '' });
                }
              }}
            />
          </div>
          <div className={styles.buttonsWrapper}>
            <div className={styles.buttons}>
              <Button
                type="button"
                variant="outlined"
                style={{
                  width: '182px',
                  height: '57px',
                  color: 'var(--primary-color)',
                  border: '1px solid var(--primary-color)',
                }}
                onClick={() => resetFormData()}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{
                  width: '182px',
                  height: '57px',
                  backgroundColor: 'var(--primary-color)',
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <p
            className={styles.movieFormcloseIcon}
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            ✕
          </p>
        </form>
      </div>
    </div>
  );
}

export default MovieForm;
