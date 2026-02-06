import LoginForm from '../features/user/LoginForm';
import styles from '../features/user/AuthForm.module.css';

export default function LoginPage() {
  return (
    <div className={styles.authContainer}>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}
