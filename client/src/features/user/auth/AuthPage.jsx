import styles from './AuthForm.module.css';

export default function AuthPage({ title, children }) {
  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
