import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import FilmList from "../film-list/film-list.jsx";
import FilmDescription from "../film-description/film-description.jsx";
import Header from "../header/header.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import withActiveTab from '../../hocs/with-active-tab/with-active-tab';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {connect} from "react-redux";

import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getFilms, getComments, getFilmById} from "../../reducer/data/selectors.js";

import {Operation as DataOperation} from "../../reducer/data/data.js";

const MORE_LIKE_FILMS_COUNT = 4;

const FilmListWrapped = withActiveFilm(FilmList);

const TabsWrapped = withActiveTab(Tabs);

const FilmPage = (props) => {
  const {
    film,
    films,
    comments,
    authorizationStatus,
    onFilmAddToFavorites,
  } = props;
  const {
    name,
    posterImage,
    backgroundImage,
    genre,
  } = film;

  return (
    <>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="movie-card__wrap">
          <FilmDescription
            film={film}
            authorizationStatus={authorizationStatus}
            onAddToFavorites={onFilmAddToFavorites}
          >
            {authorizationStatus === AuthorizationStatus.AUTH &&
                <Link
                  to={`${AppRoute.FILMS}${film.id}${AppRoute.REVIEW}`}
                  href="add-review"
                  className="btn movie-card__button"
                >Add review</Link>}
          </FilmDescription>
        </div>
      </div >

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>
          <TabsWrapped
            film={film}
            comments={comments}
          />
        </div>
      </div>
    </section >

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <FilmListWrapped
          films={films.filter((it) => it.genre === genre && it !== film)}
          showingFilmsCount={MORE_LIKE_FILMS_COUNT}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link
            to={AppRoute.ROOT}
            href="main.html"
            className="logo__link logo__link--light"
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  comments: PropTypes.array,
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  onFilmAddToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  film: getFilmById(state, props.id),
  authorizationStatus: getAuthorizationStatus(state),
  films: getFilms(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilmAddToFavorites(filmId, status) {
    dispatch(DataOperation.addFilmToFavorites(filmId, status));
  },
});

export {FilmPage};
export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
