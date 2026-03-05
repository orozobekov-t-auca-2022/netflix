import MuiPagination from '@mui/material/Pagination';
import styles from './Movies.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <MuiPagination
        page={currentPage}
        count={totalPages}
        variant="outlined"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'var(--text-color)',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            borderColor: 'var(--primary-color)',
            color: 'var(--text-color)',
          },
        }}
        onChange={(_, page) => onChange(page)}
      />
    </div>
  );
}

export default Pagination;
