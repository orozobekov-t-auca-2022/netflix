import styles from './Movies.module.css';
import type { MovieProps } from '../../pages/MoviesList/type';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import TooltipContent from './TooltipContent';

function Card({ movie }: { movie: MovieProps }) {
  const { title, release_date, genres, poster_path } = movie;
  const year = new Date(release_date).getFullYear();
  const [isToolTipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className={styles.card}>
      <img src={poster_path} alt={title} className={styles.poster} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.yearContainer}>
          <span className={styles.year}>{year}</span>
        </div>
      </div>
      <p className={styles.genres}>{genres}</p>
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
        onClick={() => setIsTooltipOpen(!isToolTipOpen)}
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
        >
          <TooltipContent onClose={() => setIsTooltipOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Card;
