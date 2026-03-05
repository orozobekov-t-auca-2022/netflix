import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesList from './pages/MoviesList';
import Login from './pages/Login';
import Footer from './components/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import MovieDetails from './pages/MovieDetails';
import MovieForm from './pages/MovieForm';
import Header from './components/Header';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MoviesList />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/:movieId"
            element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-movie"
            element={
              <PrivateRoute requiredRole="admin">
                <MovieForm mode="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/:movieId/edit-movie"
            element={
              <PrivateRoute requiredRole="admin">
                <MovieForm mode="edit" />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
