import { Route, Routes } from 'react-router-dom';
import MoviesList from './pages/MoviesList';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:movieId" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
