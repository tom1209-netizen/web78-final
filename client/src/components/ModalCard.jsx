import React from 'react'
import '../scss/ModalCard.scss'

function Modal({movie, onClose}) {
  return (
    <div className="modal-card">
      <div className="modal-close" onClick={onClose}>
        &times;
      </div>
      <div className="modal-poster">
        <img src="https://teachingk18.github.io/WF_Test_ver2/poster_film_img/1.jpg" alt="Room Movie Poster" />
      </div>
      <div className="modal-details">
        <div className="title">
          <h1>{movie.title}</h1>
          <p>{movie.duration} min {movie.year}</p>
        </div>
        <p className='intro'>
          Jack is a young boy of 5 years old who has lived all his life in one room. He believes everything within it are the only real things in the world. But what will happen when his Ma suddenly tells him that there are other things outside of Room?
        </p>
        <button className="play-button">PLAY MOVIE</button>
      </div>
    </div>
  );
}

export default Modal