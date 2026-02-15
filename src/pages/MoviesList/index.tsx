import Header from '../../components/Header';
import Movies from '../../components/Movies';
import styles from './MoviesList.module.css';

function MoviesList() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <Header />
          <Movies />
        </div>
      </div>
    </>
  );
}

export default MoviesList;
