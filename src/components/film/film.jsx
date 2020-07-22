import React from "react";
import PropTypes from "prop-types";

const Film = (props) => {
  const {film, onHeaderClick, onFilmHover} = props;

  return (
    <article
      id={film.id}
      className="small-movie-card catalog__movies-card"
      onMouseOver={(evt) => onFilmHover(evt.currentTarget.id)}
    >
      <div className="small-movie-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={onHeaderClick}
        >{film.name}</a>
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
  onHeaderClick: PropTypes.func.isRequired,
  onFilmHover: PropTypes.func.isRequired,
};

export default Film;
