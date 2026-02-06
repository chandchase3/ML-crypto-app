import RegisterForm from '../features/user/RegisterForm';
import styles from '../features/user/AuthForm.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      {/* Embed the reusable RegisterForm */}
      <RegisterForm />
    </div>
  );
}
