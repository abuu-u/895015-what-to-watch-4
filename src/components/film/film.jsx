import React from "react";
import PropTypes from "prop-types";

const Film = (props) => {
  const {film, onFilmClick, onFilmHover, index} = props;

  return (
    <article
      id={film.id}
      className="small-movie-card catalog__movies-card"
      onMouseOver={onFilmHover}
      onClick={onFilmClick}
      data-index={index}
    >
      <div className="small-movie-card__image">
        <img
          src={film.previewImage}
          alt={film.name}
          width="280" height="175"
        />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{film.name}</a>
      </h3>
    </article>
  );
};

Film.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onFilmHover: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Film;
