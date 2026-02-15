import styles from './Header.module.css';

function HeaderTitle() {
  return (
    <div className={styles.navigationHeader}>
      <div className={styles.logo}>netflixroulette</div>
      <div>
        <button>+Add Movie</button>
        <button>User Logo</button>
      </div>
    </div>
  );
}

export default HeaderTitle;
