import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WatchlistPage from './pages/WatchlistPage';
import KrakenPage from './pages/KrakenPage';
import PrivateRoute from './auth/PrivateRoute'; // we’ll create this next

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/watchlists"
            element={
              <PrivateRoute>
                <WatchlistPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/kraken"
            element={
              <PrivateRoute>
                <KrakenPage />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
