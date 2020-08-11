import React from "react";
import PropTypes from "prop-types";
import {STATUS, AppRoute} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Link} from "react-router-dom";

const FilmDescription = (props) => {
  const {
    film,
    authorizationStatus,
    onFilmPlayClick,
    onAddToFavorites,
    children,
  } = props;
  const {
    id,
    isFavorite,
    name,
    genre,
    released,
  } = film;

  return (
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{name}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{genre}</span>
        <span className="movie-card__year">{released}</span>
      </p>

      <div className="movie-card__buttons">
        <button
          className="btn btn--play movie-card__button"
          type="button"
          onClick={() => {
            onFilmPlayClick(film);
          }}
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
        <Link to={authorizationStatus === AuthorizationStatus.AUTH ? `` : AppRoute.LOGIN}
          className="btn btn--list movie-card__button"
          type="button"
          onClick={() => {
            onAddToFavorites(id, isFavorite ? STATUS.remove : STATUS.add);
          }}
        >
          {isFavorite
            ? <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"></use>
            </svg>
            : < svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>}
          <span>My list</span>
        </Link>
        {children}
      </div>
    </div>
  );
};

FilmDescription.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onFilmPlayClick: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

export default FilmDescription;
