import styles from './loading-screen.module.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingText}>
        <span className={styles.loading}>Loading</span>
      </div>
      <div className={styles.dotsContainer}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
