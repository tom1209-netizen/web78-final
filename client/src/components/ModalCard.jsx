import React from 'react'
import '../scss/ModalCard.scss'

function Modal({movie, onClose}) {
  return (
    <div className="modal-card">
      <div className="modal-close" onClick={onClose}>
        &times;
      </div>
      <div className="modal-poster">
        <img src={movie.image} alt="Room Movie Poster" />
      </div>
      <div className="modal-details">
        <div className="title">
          <h1>{movie.name}</h1>
          <p>{movie.time} min {movie.year}</p>
        </div>
        <p className='intro'>
          {movie.introduce}
        </p>
        <button className="play-button">PLAY MOVIE</button>
      </div>
    </div>
  );
}

export default Modal