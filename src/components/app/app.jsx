import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FilmPage from "../film-page/film-page.jsx";
import FilmPlayer from "../film-player/film-player.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/film/film.js";
// import {AuthorizationStatus} from "../../reducer/user/user.js";
import withFilmPlayer from '../../hocs/with-film-player/with-film-player';
import {getActiveFilm, getActiveGenre, getPlayingFilm, getShowingFilmsCount} from "../../reducer/film/selectors.js";
import {getFilms, getFilmsByGenre, getPromoFilm, getComments} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
const FilmPlayerWrapper = withFilmPlayer(FilmPlayer);

class App extends React.PureComponent {
  _renderScreen() {
    const {
      // authorizationStatus,
      // login,
      promoFilm,
      films,
      showingFilmsCount,
      comments,
      activeGenre,
      filmsByGenre,
      activeFilm,
      playingFilm,
      onGenreClick,
      onShowMoreClick,
      onFilmClick,
      onFilmPlayClick,
    } = this.props;

    if (playingFilm) {
      return (
        <FilmPlayerWrapper
          film={playingFilm}
        />
      );
    }

    if (activeFilm) {
      return (
        <FilmPage
          film={activeFilm}
          films={films}
          comments={comments}
          onFilmClick={onFilmClick}
          onFilmPlayClick={onFilmPlayClick}
        />
      );
    }

    return (
      <Main
        promoFilm={promoFilm}
        films={films}
        filmsByGenre={filmsByGenre}
        activeGenre={activeGenre}
        showingFilmsCount={showingFilmsCount}
        onFilmClick={onFilmClick}
        onGenreClick={onGenreClick}
        onShowMoreClick={onShowMoreClick}
        onFilmPlayClick={onFilmPlayClick}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // authorizationStatus: PropTypes.string.isRequired,
  // login: PropTypes.func.isRequired,
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
  comments: PropTypes.array,
  filmsByGenre: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  activeFilm: PropTypes.object,
  showingFilmsCount: PropTypes.number.isRequired,
  playingFilm: PropTypes.object,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  onFilmPlayClick: PropTypes.func.isRequired,
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
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
