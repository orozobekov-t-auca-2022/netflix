import { Alert, Button, Snackbar } from '@mui/material';
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
} from '../../store/thunks';
import type { MovieFormData } from '../../types/movieForm';
import { useAppDispatch } from '../../store/hooks';

const createEmptyFormData = (): MovieFormData => ({
  title: '',
  poster_path: '',
  release_date: '',
  vote_average: 0,
  runtime: '',
  overview: '',
  genres: [],
});

type FieldErrors = Record<keyof MovieFormData, boolean>;

const createEmptyErrors = (): FieldErrors => ({
  title: false,
  poster_path: false,
  release_date: false,
  vote_average: false,
  runtime: false,
  overview: false,
  genres: false,
});

function MovieForm({ mode }: { mode: 'create' | 'edit' }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { movieId } = useParams();

  const [formData, setFormData] = useState<MovieFormData>(
    createEmptyFormData()
  );

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
    useState<FieldErrors>(createEmptyErrors());
  const [requiredMessage, setRequiredMessage] = useState<boolean>(false);

  const validateForm = (data: MovieFormData): FieldErrors => {
    const errors: FieldErrors = createEmptyErrors();

    if (!data.title.trim()) errors.title = true;
    if (!data.poster_path.trim()) errors.poster_path = true;
    if (!data.release_date.trim()) errors.release_date = true;
    if (data.vote_average === 0) errors.vote_average = true;
    if (!data.runtime.trim()) errors.runtime = true;
    if (!data.overview.trim()) errors.overview = true;

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formData);
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error);
    setRequiredMessage(hasErrors);

    if (!hasErrors) {
      await dispatch(addMovieThunk(formData));
      await dispatch(fetchMoviesThunk({})).unwrap();
      console.log('Form submitted successfully:', formData);
      resetFormData();
      navigate('/', {
        state: { showCreateSuccess: true },
        replace: false,
      });
    }
  };

  const resetFormData = () => {
    setFormData(createEmptyFormData());
    setFieldErrors(createEmptyErrors());
    setRequiredMessage(false);
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
                  onChange={(value) =>
                    setFormData({ ...formData, title: value })
                  }
                />
              </div>
              <div>
                <MovieFromInputField
                  label="poster url"
                  placeholder="https://"
                  type="url"
                  value={formData.poster_path}
                  onChange={(value) =>
                    setFormData({ ...formData, poster_path: value })
                  }
                />
              </div>
              <div>
                <MovieFormGenreDropdown
                  value={formData.genres}
                  onChange={(selectedGenres) => {
                    setFormData({ ...formData, genres: selectedGenres });
                    if (selectedGenres.length > 0) {
                      setFieldErrors({ ...fieldErrors, genres: false });
                    }
                  }}
                  error={fieldErrors.genres}
                />
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div>
                <MovieFormInputDate
                  label="release date"
                  placeholder="Select Date"
                  value={formData.release_date}
                  onChange={(value) =>
                    setFormData({ ...formData, release_date: value })
                  }
                />
              </div>
              <div>
                <MovieFromInputField
                  label="rating"
                  placeholder="7.8"
                  type="number"
                  inputProps={{ min: 0, max: 10, step: 0.1 }}
                  value={String(formData.vote_average)}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      vote_average: parseFloat(value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <MovieFromInputField
                  label="runtime"
                  placeholder="minutes"
                  type="number"
                  value={formData.runtime}
                  onChange={(value) =>
                    setFormData({ ...formData, runtime: value })
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.overviewInput}>
            <MovieFormOverview
              placeholder="Movie description"
              type="text"
              value={formData.overview}
              onChange={(value) =>
                setFormData({ ...formData, overview: value })
              }
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
      <Snackbar
        open={requiredMessage}
        autoHideDuration={2500}
        onClose={() => setRequiredMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setRequiredMessage(false)}
        >
          ALL FIELDS ARE REQUIRED
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MovieForm;
