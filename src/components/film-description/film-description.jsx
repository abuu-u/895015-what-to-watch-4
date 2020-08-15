import React from "react";
import PropTypes from "prop-types";
import {STATUS, AppRoute} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Link} from "react-router-dom";
import history from "../../history";

const FilmDescription = (props) => {
  const {
    film,
    authorizationStatus,
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
        <Link to={`${AppRoute.PLAYER}/${film.id}`}
          className="btn btn--play movie-card__button"
          type="button"
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </Link>
        <button
          className="btn btn--list movie-card__button"
          type="button"
          onClick={() => (
            authorizationStatus === AuthorizationStatus.AUTH
              ? onAddToFavorites(id, isFavorite ? STATUS.remove : STATUS.add)
              : history.push(AppRoute.LOGIN)
          )}
        >
          {isFavorite
            ? <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"></use>
            </svg>
            : < svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>}
          <span>My list</span>
        </button>
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
  onAddToFavorites: PropTypes.func.isRequired,
};

export default FilmDescription;
