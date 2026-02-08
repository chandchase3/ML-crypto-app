import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthForm.module.css';
import AuthPage from './AuthPage';

export default function AuthForm({ mode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === 'login';

  useEffect(() => {
    if (token) navigate('/watchlists');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await dispatch(login({ email, password }));
    } else {
      await dispatch(register({ email, password }));
    }
  };

  return (
    <AuthPage title={isLogin ? 'Login' : 'Register'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading
            ? isLogin
              ? 'Logging in...'
              : 'Registering...'
            : isLogin
            ? 'Login'
            : 'Register'}
        </button>

        {error && <p className={styles.error}>{error.message || error}</p>}

        <p className={styles.switchText}>
          {isLogin ? "Don’t have an account?" : 'Already have an account?'}{' '}
          <Link to={isLogin ? '/register' : '/login'} className={styles.link}>
            {isLogin ? 'Create account' : 'Log in'}
          </Link>
        </p>
      </form>
    </AuthPage>
  );
}
