import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import styles from './TopNavbar.module.css';

export default function TopNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { email } = useSelector((state) => state.user) || {};

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // send user back to login page
  };


  return (
    <nav className={styles.navbar}>
      {/* Left: Logo/Home */}
      <div className={styles.navbarLogo}>
        <Link to="/">Crypto</Link>
      </div>

      {/* Right: Main navigation */}
      <div className={styles.navbarLinks}>
        <Link to="/watchlists">Lists</Link>
        <Link to="/news">News</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/profile">Profile</Link>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
