import { useState, useEffect } from 'react';
import '../scss/App.scss';
import Header from './Header.jsx';
import MovieCard from './MovieCard.jsx';
import ModalCard from './ModalCard.jsx';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 4; 

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3003/api/movies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = Math.min(startIndex + moviesPerPage, movies.length);
    setDisplayedMovies(movies.slice(startIndex, endIndex));
  }, [movies, currentPage]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && displayedMovies.length === moviesPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3003/api/movies/search/${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const hasMultiplePages = movies.length > moviesPerPage;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      {isModalOpen && <ModalCard movie={selectedMovie} onClose={closeModal} />}
      {!isModalOpen && (
        <>
          <Header onSearch={handleSearch} onReset={fetchMovies} />
          <p className='movie-tag'>Most Popular Movies</p>
          <div className="movie-list">
            {displayedMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} onClick={() => handleMovieClick(movie)} />
            ))}
          </div>
          {hasMultiplePages && (
            <div className="pagination">
              <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
              <button onClick={() => handlePageChange('next')}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;