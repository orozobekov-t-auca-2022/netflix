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
        color="primary"
        onChange={(_, page) => onChange(page)}
      />
    </div>
  );
}

export default Pagination;
