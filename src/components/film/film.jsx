import React from "react";
import PropTypes from "prop-types";
import PreviewPlayer from "../preview-player/preview-player.jsx";

const Film = (props) => {
  const {
    film,
    onFilmClick,
    onFilmMouseOver,
    onFilmMouseLeave,
    index,
    isActive,
  } = props;

  return (
    <article
      id={film.id}
      className="small-movie-card catalog__movies-card"
      onClick={(evt) => {
        evt.preventDefault();
        onFilmClick(evt.currentTarget.dataset.index);
      }}
      onMouseOver={(evt) => {
        onFilmMouseOver(parseInt(evt.currentTarget.id, 10));
      }}
      onMouseLeave={onFilmMouseLeave}
      data-index={index}
    >
      <div className="small-movie-card__image">
        {isActive ? <PreviewPlayer
          previewVideoLink={film.previewVideoLink}
        /> :
          <img
            src={film.previewImage}
            alt={film.name}
            width="280" height="175"
          />}
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
    previewVideoLink: PropTypes.string.isRequired,
  }).isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onFilmMouseLeave: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Film;
