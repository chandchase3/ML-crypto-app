import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice'; // your thunk
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthForm.module.css'; // CSS Module

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.user);

  // Local form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if logged in
  useEffect(() => {
    if (token) navigate('/watchlists');
  }, [token, navigate]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));

    if (login.rejected.match(resultAction)) {
      console.log('Login failed:', resultAction.payload);
    }
  };

  return (
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
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Display error if any */}
      {error && <p className={styles.error}>{error.message || error}</p>}

      {/* THIS is your navigation link to Register */}
      <p className={styles.switchText}>
        Don’t have an account?{' '}
        <Link to="/register" className={styles.link}>
          Create account
        </Link>
      </p>
    </form>
  );
}
