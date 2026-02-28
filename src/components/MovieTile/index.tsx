import styles from './MovieTile.module.css';
import type { MovieProps } from '../../pages/MoviesList/type';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import TooltipContent from './TooltipContent';
import Poster from './Poster';
import Info from './Info';
import { useAuth } from '../../provider/useAuth';
import ConfirmModal from '../common/ConfirmModal';
import { useAppDispatch } from '../../store/hooks';
import { deleteMovieThunk, fetchMoviesThunk } from '../../store/thunks';
import { useNavigate, useSearchParams } from 'react-router-dom';

function MovieTile({ movie }: { movie: MovieProps }) {
  const { id, title, release_date, genres, poster_path } = movie;
  const year = new Date(release_date).getFullYear();
  const [isToolTipOpen, setIsTooltipOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { isAdmin } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleDeleteClick = () => {
    setIsTooltipOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteMovieThunk(id));
    const search = searchParams.get('search') || undefined;
    const filter = searchParams.get('filter') || undefined;
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = searchParams.get('sortOrder') || undefined;

    await dispatch(fetchMoviesThunk({ search, filter, sortBy, sortOrder }));
    setIsConfirmOpen(false);
  };

  return (
    <div className={styles.card} onClick={() => navigate(`/${id}`)}>
      <Poster poster_path={poster_path} title={title} />
      <Info title={title} year={year} genres={genres} />
      {isAdmin && (
        <>
          <IconButton
            style={{
              width: '36px',
              height: '36px',
              position: 'absolute',
              top: '15px',
              right: '25px',
              backgroundColor: 'rgba(42, 32, 45, 1)',
              color: 'var(--text-color)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipOpen(!isToolTipOpen);
            }}
          >
            <MoreVertIcon />
          </IconButton>
          {isToolTipOpen && (
            <div
              style={{
                position: 'absolute',
                top: '55px',
                right: '25px',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                zIndex: 10,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <TooltipContent
                movieId={id}
                onClose={() => setIsTooltipOpen(false)}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </>
      )}
      {isConfirmOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsConfirmOpen(false)}
        >
          <ConfirmModal
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </div>
  );
}

export default MovieTile;
