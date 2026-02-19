import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <span className={styles.netflix}>netflix</span>
        <span className={styles.roulette}>roulette</span>
      </Link>
    </footer>
  );
}

export default Footer;
