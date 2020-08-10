import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import FilmList from "../film-list/film-list.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import withActiveTab from '../../hocs/with-active-tab/with-active-tab';

const MORE_LIKE_FILMS_COUNT = 4;

const FilmListWrapped = withActiveFilm(FilmList);

const TabsWrapped = withActiveTab(Tabs);

const FilmPage = (props) => {
  const {
    film,
    films,
    onFilmClick,
    onFilmPlayClick,
  } = props;
  const {
    name,
    posterImage,
    backgroundImage,
    genre,
    released,
  } = film;

  return (
    <>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
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
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div >

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>
          <TabsWrapped
            film={film}
          />
        </div>
      </div>
    </section >

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <FilmListWrapped
          films={films.filter((it) => it.genre === film.genre && it !== film)}
          showingFilmsCount={MORE_LIKE_FILMS_COUNT}
          onFilmClick={onFilmClick}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
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

FilmPage.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onFilmPlayClick: PropTypes.func.isRequired,
};

export default FilmPage;
