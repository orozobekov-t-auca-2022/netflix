import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesList from './pages/MoviesList';
import Login from './pages/Login';
import Footer from './components/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import MovieDetails from './pages/MovieDetails';
import MovieForm from './pages/MovieForm';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
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
            <PrivateRoute>
              <MovieForm />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
