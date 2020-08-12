import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import history from '../../history';
import {AppRoute} from '../../const';

import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import FilmPlayer from "../film-player/film-player.jsx";
import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import PrivateRout from '../private-route/private-route.jsx';

import withFilmPlayer from '../../hocs/with-film-player/with-film-player';
import withSubmit from '../../hocs/with-submit/with-submit';

import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getFilms, getFilmsByGenre, getPromoFilm, getComments, getFilmById} from "../../reducer/data/selectors.js";
import {getActiveFilm, getActiveGenre, getPlayingFilm, getShowingFilmsCount} from "../../reducer/film/selectors.js";

import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/film/film.js";

const FilmPlayerWrapper = withFilmPlayer(FilmPlayer);
const AddReviewWrapper = withSubmit(AddReview);

class App extends React.PureComponent {
  _renderScreen() {
    const {
      promoFilm,
      films,
      showingFilmsCount,
      authorizationStatus,
      comments,
      activeGenre,
      filmsByGenre,
      activeFilm,
      playingFilm,
      onGenreClick,
      onShowMoreClick,
      onFilmClick,
      onFilmPlayClick,
      onFilmAddToFavorites,
      onPromFilmAddToFavorites,
    } = this.props;

    if (playingFilm) {
      return (
        <FilmPlayerWrapper
          film={playingFilm}
        />
      );
    }

    if (activeFilm && films && comments) {
      history.push();
    }

    if (films && promoFilm && filmsByGenre) {
      return (
        <Main
          promoFilm={promoFilm}
          films={films}
          filmsByGenre={filmsByGenre}
          activeGenre={activeGenre}
          showingFilmsCount={showingFilmsCount}
          authorizationStatus={authorizationStatus}
          onFilmClick={onFilmClick}
          onGenreClick={onGenreClick}
          onShowMoreClick={onShowMoreClick}
          onFilmPlayClick={onFilmPlayClick}
          onPromFilmAddToFavorites={onPromFilmAddToFavorites}
        />
      );
    }

    return null;
  }

  render() {
    const {
      promoFilm,
      films,
      showingFilmsCount,
      authorizationStatus,
      comments,
      activeGenre,
      filmsByGenre,
      activeFilm,
      playingFilm,
      onGenreClick,
      onShowMoreClick,
      onFilmClick,
      onFilmPlayClick,
      onFilmAddToFavorites,
      onPromFilmAddToFavorites,
      onCommentSubmit,
      login,
    } = this.props;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              onSubmit={login}
            />
          </Route>
          <PrivateRout
            exact path={`${AppRoute.FILMS}:id${AppRoute.REVIEW}`}
            authorizationStatus={authorizationStatus}
            render={({match}) => (
              <AddReviewWrapper
                id={Number(match.params.id)}
                onSubmit={onCommentSubmit}
              />
            )}
          />
          <Route
            exact path={`${AppRoute.FILMS}:id${AppRoute.PLAYER}`}
            render={({match}) => {
              return (
                <FilmPlayerWrapper
                  id={Number(match.params.id)}
                />
              );
            }}
          />
          <Route
            exact path={`${AppRoute.FILMS}:id`}
            render={({match}) => {
              return (
                <FilmPage
                  id={Number(match.params.id)}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
  comments: PropTypes.array,
  filmsByGenre: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  activeFilm: PropTypes.object,
  showingFilmsCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  playingFilm: PropTypes.object,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onFilmPlayClick: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  onFilmAddToFavorites: PropTypes.func.isRequired,
  onPromFilmAddToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activeGenre: getActiveGenre(state),
  activeFilm: getActiveFilm(state),
  films: getFilms(state),
  filmsByGenre: getFilmsByGenre(state),
  showingFilmsCount: getShowingFilmsCount(state),
  playingFilm: getPlayingFilm(state),
  promoFilm: getPromoFilm(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onGenreClick(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.resetShowingFilmsCount());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementShowingFilmsCount());
  },
  onFilmClick(film) {
    dispatch(DataOperation.loadComments(film.id));
    dispatch(ActionCreator.setActiveFilm(film));
  },
  onFilmPlayClick(film) {
    dispatch(ActionCreator.setPlayingFilm(film));
  },
  onCommentSubmit(comment, filmId) {
    dispatch(DataOperation.submitComment(comment, filmId));
  },
  onFilmAddToFavorites(filmId, status) {
    dispatch(DataOperation.addFilmToFavorites(filmId, status));
  },
  onPromFilmAddToFavorites(filmId, status) {
    dispatch(DataOperation.addPromoFilmToFavorites(filmId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
