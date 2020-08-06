import React from "react";
import FilmList from "../film-list/film-list.jsx";
import GenresFilter from "../genres-filter/genres-filter.jsx";
import ShowMore from "../show-more/show-more.jsx";
import withActiveFilm from "../../hocs/with-active-film";
import PropTypes from "prop-types";
import {filterFilmsByGenre} from '../../utils';

const FilmListWrapped = withActiveFilm(FilmList);

const Main = (props) => {
  const {
    promoFilm,
    films,
    activeGenre,
    showingFilmsCount,
    onFilmClick,
    onGenreClick,
    onShowMoreClick,
  } = props;

  const filteredFilms = filterFilmsByGenre(activeGenre, films);

  return (
  <>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoFilm.NAME}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoFilm.GENRE}</span>
              <span className="movie-card__year">{promoFilm.RELEASE_DATE}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresFilter
          activeGenre={activeGenre}
          films={films}
          onGenreClick={onGenreClick}
        />

        <FilmListWrapped
          films={filteredFilms}
          showingFilmsCount={showingFilmsCount}
          onFilmClick={onFilmClick}
        />

        {filteredFilms.length > showingFilmsCount && <ShowMore
          onShowMoreClick={onShowMoreClick}
        />}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </>
  );
};

Main.propTypes = {
  promoFilm: PropTypes.shape({
    NAME: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    RELEASE_DATE: PropTypes.number.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  showingFilmsCount: PropTypes.number.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
};

export default Main;
