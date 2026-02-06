import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './userSlice'; // your thunk
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthForm.module.css';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) navigate('/watchlists');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register({ email, password }));

    if (register.rejected.match(resultAction)) {
      console.log('Register failed:', resultAction.payload);
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
        {loading ? 'Registering...' : 'Register'}
      </button>

      {error && <p className={styles.error}>{error.message || error}</p>}

      {/* THIS is your navigation link to Login */}
      <p className={styles.switchText}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </form>
  );
}
