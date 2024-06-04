// src/components/MovieCard.js
import React from 'react';
import '../scss/MovieCard.scss';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={movie.image} alt={movie.name} />
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p>{movie.time} {movie.year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
