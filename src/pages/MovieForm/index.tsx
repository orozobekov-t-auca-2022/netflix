import { Alert, Button, Snackbar } from '@mui/material';
import { useState, type FormEvent } from 'react';
import MovieFromInputField from './components/MovieFormInputField';
import styles from './MovieForm.module.css';
import MovieFormOverview from './components/MovieFormOverview';
import { useNavigate } from 'react-router-dom';
import MovieFormGenreDropdown from './components/MovieFormGenreDropdown';
import MovieFormInputDate from './components/MovieFormInputDate';
import { createMovie, fetchMovies } from '../../store/movies/moviesThunk';
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

function MovieForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<MovieFormData>(
    createEmptyFormData()
  );
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
      await dispatch(createMovie(formData));
      await dispatch(fetchMovies({})).unwrap();
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
          <h2 className={styles.movieFormTitle}>Add New Movie</h2>
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
