// src/App.js
import React, { useState } from 'react';
import '../scss/App.scss';
import Header from './Header.jsx';
import MovieCard from './MovieCard.jsx';
import ModalCard from './ModalCard.jsx';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movies = [
    { title: 'Room', duration: '117 min', year: 2015, img: 'room.jpg' },
    { title: 'Whiplash', duration: '167 min', year: 2015, img: 'whiplash.jpg' },
    { title: 'Mad Max', duration: '120 min', year: 2015, img: 'madmax.jpg' },
    { title: 'The Revenant', duration: '156 min', year: 2015, img: 'revenant.jpg' },
  ];

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      {isModalOpen && <ModalCard movie={selectedMovie} onClose={closeModal} />}
      {!isModalOpen && (
        <>
          <Header />
          <p className='movie-tag'>Most Popular Movies</p>
          <div className="movie-list">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} onClick={() => handleMovieClick(movie)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
