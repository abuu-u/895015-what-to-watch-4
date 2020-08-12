import React from "react";
import PropTypes from "prop-types";
import PreviewPlayer from "../preview-player/preview-player.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const Film = (props) => {
  const {
    film,
    onFilmMouseOver,
    onFilmMouseLeave,
    index,
    isActive,
  } = props;

  return (
    <article
      id={film.id}
      className="small-movie-card catalog__movies-card"
      onMouseOver={(evt) => {
        onFilmMouseOver(parseInt(evt.currentTarget.id, 10));
      }}
      onMouseLeave={onFilmMouseLeave}
      data-index={index}
    >
      <Link to={`${AppRoute.FILMS}${film.id}`}>
        <div className="small-movie-card__image">
          {isActive
            ? <PreviewPlayer
              previewVideoLink={film.previewVideoLink}
            />
            : <img
              src={film.previewImage}
              alt={film.name}
              width="280" height="175"
            />}
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILMS}${film.id}`} className="small-movie-card__link">{film.name}</Link>
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
  onFilmMouseOver: PropTypes.func.isRequired,
  onFilmMouseLeave: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Film;
