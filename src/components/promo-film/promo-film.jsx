import React from "react";
import PropTypes from "prop-types";
import Header from '../header/header.jsx';
import FilmDescription from "../film-description/film-description.jsx";

const PromoFilm = (props) => {
  const {
    authorizationStatus,
    promoFilm,
    onPromFilmAddToFavorites,
  } = props;
  const {
    name,
    backgroundImage,
    posterImage,
  } = promoFilm;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header/>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <FilmDescription
            film={promoFilm}
            authorizationStatus={authorizationStatus}
            onAddToFavorites={onPromFilmAddToFavorites}
          />
        </div>
      </div>
    </section>
  );
};

PromoFilm.propTypes = {
  promoFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onPromFilmAddToFavorites: PropTypes.func.isRequired,
};

export default PromoFilm;
