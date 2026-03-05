import Movies from '../../components/Movies';
import styles from './MoviesList.module.css';
import MovieMap from '../../assets/MovieMap.png';
import HomeIntro from '../../components/HomeIntro';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CongratulationsModule from './components/CongratulationsModule';

function MoviesList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const showCreateSuccess = Boolean(location.state?.showCreateSuccess);
  const isSuccessModalOpen = openSuccessModal || showCreateSuccess;

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    if (showCreateSuccess) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  };

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
          <HomeIntro />
          <Movies />
        </div>
      </div>
      <CongratulationsModule
        open={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </>
  );
}

export default MoviesList;
