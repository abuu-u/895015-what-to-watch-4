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
import withSubmit from '../../hocs/with-submit/with-submit';
import withLogin from '../../hocs/with-login/with-login';

import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getFilms, getFilmsByGenre, getPromoFilm, getFavoriteFilms} from "../../reducer/data/selectors.js";
import {getActiveGenre, getShowingFilmsCount} from "../../reducer/film/selectors.js";

import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/film/film.js";

const FilmPlayerWrapper = withFilmPlayer(FilmPlayer);
const AddReviewWrapper = withSubmit(AddReview);
const SignInWrapper = withLogin(SignIn);

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
      onGenreClick,
      onShowMoreClick,
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
            <Main
              promoFilm={promoFilm}
              films={films}
              filmsByGenre={filmsByGenre}
              activeGenre={activeGenre}
              showingFilmsCount={showingFilmsCount}
              authorizationStatus={authorizationStatus}
              onGenreClick={onGenreClick}
              onShowMoreClick={onShowMoreClick}
              onPromFilmAddToFavorites={onPromFilmAddToFavorites}
            />
          </Route>
          <Route
            exact path={AppRoute.LOGIN}
            render={() => {
              return (
                authorizationStatus !== AuthorizationStatus.AUTH
                  ? <SignInWrapper
                    onSubmit={login}
                  />
                  : history.push(AppRoute.ROOT)
              );
            }}
          />
          <PrivateRoute
            exact path={`${AppRoute.FILMS}:id${AppRoute.REVIEW}`}
            authorizationStatus={authorizationStatus}
            render={(match) => {
              return (
                <AddReviewWrapper
                  id={Number(match.params.id)}
                  onSubmit={onCommentSubmit}
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
          <Route
            exact path={`${AppRoute.PLAYER}:id`}
            render={({match}) => {
              return (
                <FilmPlayerWrapper
                  id={Number(match.params.id)}
                />
              );
            }}
          />
          <PrivateRoute
            exact path={AppRoute.MY_LIST}
            authorizationStatus={authorizationStatus}
            render={() => {
              return (
                <MyList
                  films={favoriteFilms}
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
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  onPromFilmAddToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  activeGenre: getActiveGenre(state),
  films: getFilms(state),
  filmsByGenre: getFilmsByGenre(state),
  showingFilmsCount: getShowingFilmsCount(state),
  promoFilm: getPromoFilm(state),
  favoriteFilms: getFavoriteFilms(state)
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
    dispatch(DataOperation.addPromoFilmToFavorites(filmId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
