import { Button, Select } from '@mui/material';
import MovieFromInputField from './components/MovieFormInputField';
import styles from './MovieForm.module.css';
import MovieFormOverview from './components/MovieFormOverview';

function MovieForm() {
  return (
    <div className={styles.movieFormPage}>
      <div className={styles.movieFormContainer}>
        <form className={styles.movieForm}>
          <div className={styles.movieFormInputs}>
            <div className={styles.leftColumn}>
              <div>
                <MovieFromInputField label="name" placeholder="Enter name" />
              </div>
              <div>
                <MovieFromInputField
                  label="poster url"
                  placeholder="https://"
                />
              </div>
              <div className={styles.genreDropdown}>
                <Select></Select>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div>
                <MovieFromInputField
                  label="release date"
                  placeholder="Select date"
                />
              </div>
              <div>
                <MovieFromInputField label="rating" placeholder="7.8" />
              </div>
              <div>
                <MovieFromInputField label="runtime" placeholder="minutes" />
              </div>
            </div>
          </div>
          <div className={styles.overviewInput}>
            <MovieFormOverview />
          </div>
          <div className={styles.buttonsWrapper}>
            <div className={styles.buttons}>
              <Button
                variant="outlined"
                color="primary"
                style={{ width: '182px', height: '57px' }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '182px', height: '57px' }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieForm;
