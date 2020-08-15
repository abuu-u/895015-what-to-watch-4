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
import PrivateRoute from '../private-route/private-route.jsx';
import MyList from "../my-list/my-list.jsx";

import withFilmPlayer from '../../hocs/with-film-player/with-film-player';
import withSubmit from '../../hocs/with-comment-validation/with-comment-validation';
import withLoginValidation from '../../hocs/with-login-validation/with-login-validation';

import {getAuthorizationStatus, getAuthInfo} from "../../reducer/user/selectors.js";
import {getFilms, getFilmsByGenre, getPromoFilm, getFavoriteFilms, getFilmById, getComments} from "../../reducer/data/selectors.js";
import {getActiveGenre, getShowingFilmsCount} from "../../reducer/film/selectors.js";

import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/film/film.js";

const FilmPlayerWrapper = withFilmPlayer(FilmPlayer);
const AddReviewWrapper = withSubmit(AddReview);
const SignInWrapper = withLoginValidation(SignIn);

class App extends React.PureComponent {
  render() {
    const {
      promoFilm,
      films,
      favoriteFilms,
      showingFilmsCount,
      authorizationStatus,
      activeGenre,
      filmsByGenre,
      comments,
      authInfo,
      onGenreClick,
      onShowMoreClick,
      onPromFilmAddToFavorites,
      onCommentSubmit,
      onFilmAddToFavorites,
      login,
      getFilm,
      loadComments,
      loadFavoriteFilms,
    } = this.props;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              promoFilm={promoFilm}
              films={films}
              filmsByGenre={filmsByGenre}
              activeGenre={activeGenre}
              showingFilmsCount={showingFilmsCount}
              authorizationStatus={authorizationStatus}
              authInfo={authInfo}
              onGenreClick={onGenreClick}
              onShowMoreClick={onShowMoreClick}
              onPromFilmAddToFavorites={onPromFilmAddToFavorites}
            />
          </Route>
          <Route
            exact path={AppRoute.LOGIN}
            render={() => {
              return (
                <SignInWrapper
                  onLogin={login}
                />
              );
            }}
          />
          <PrivateRoute
            exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
            authorizationStatus={authorizationStatus}
            render={(match) => {
              return (
                <AddReviewWrapper
                  film={getFilm(Number(match.params.id))}
                  authInfo={authInfo}
                  onSubmit={onCommentSubmit}
                />
              );
            }}
          />
          <Route
            exact path={`${AppRoute.FILMS}/:id`}
            render={({match}) => {
              const id = Number(match.params.id);

              loadComments(id);

              return (
                <FilmPage
                  film={getFilm(id)}
                  comments={comments}
                  authorizationStatus={authorizationStatus}
                  authInfo={authInfo}
                  films={films}
                  onFilmAddToFavorites={onFilmAddToFavorites}
                />
              );
            }}
          />
          <Route
            exact path={`${AppRoute.PLAYER}/:id`}
            render={({match}) => {
              return (
                <FilmPlayerWrapper
                  film={getFilm(Number(match.params.id))}
                />
              );
            }}
          />
          <PrivateRoute
            exact path={AppRoute.MY_LIST}
            authorizationStatus={authorizationStatus}
            render={() => {
              loadFavoriteFilms();

              return (
                <MyList
                  films={favoriteFilms}
                  authInfo={authInfo}
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
  favoriteFilms: PropTypes.array.isRequired,
  filmsByGenre: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  showingFilmsCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  comments: PropTypes.array,
  authInfo: PropTypes.object,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  onPromFilmAddToFavorites: PropTypes.func.isRequired,
  onFilmAddToFavorites: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  getFilm: PropTypes.func.isRequired,
  loadFavoriteFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activeGenre: getActiveGenre(state),
  films: getFilms(state),
  filmsByGenre: getFilmsByGenre(state),
  showingFilmsCount: getShowingFilmsCount(state),
  promoFilm: getPromoFilm(state),
  favoriteFilms: getFavoriteFilms(state),
  comments: getComments(state),
  authInfo: getAuthInfo(state),
  getFilm(id) {
    return getFilmById(state, id);
  }
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    return dispatch(UserOperation.login(authData));
  },
  onGenreClick(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.resetShowingFilmsCount());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementShowingFilmsCount());
  },
  onCommentSubmit(comment, filmId) {
    return dispatch(DataOperation.submitComment(comment, filmId));
  },
  onFilmAddToFavorites(filmId, status) {
    dispatch(DataOperation.addFilmToFavorites(filmId, status));
  },
  onPromFilmAddToFavorites(filmId, status) {
    dispatch(DataOperation.addFilmToFavorites(filmId, status, true));
  },
  loadComments(filmId) {
    dispatch(DataOperation.loadComments(filmId));
  },
  loadFavoriteFilms() {
    dispatch(DataOperation.loadFavoriteFilms());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
