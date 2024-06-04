// src/components/MovieCard.js
import React from 'react';
import '../scss/MovieCard.scss';
import sample from '../assets/sample.jpeg';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={sample} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.duration} {movie.year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
