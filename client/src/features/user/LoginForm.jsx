import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.module.css'; // global CSS

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // redirect if logged in
  useEffect(() => {
    if (token) navigate('/watchlists');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.rejected.match(resultAction)) {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <form onSubmit={handleSubmit} className="form">
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

          {error && <p className="error">{error.message || error}</p>}

          <p className="switchText">
            Don’t have an account?{' '}
            <Link to="/register" className="link">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
