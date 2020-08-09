import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FilmPage from "../film-page/film-page.jsx";
import FilmPlayer from "../film-player/film-player.jsx";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer';
import withFilmPlayer from '../../hocs/with-film-player/with-film-player';

const FilmPlayerWrapper = withFilmPlayer(FilmPlayer);

class App extends React.PureComponent {
  _renderScreen() {
    const {
      promoFilm,
      films,
      activeGenre,
      activeFilm,
      playingFilm,
      showingFilmsCount,
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
          onFilmClick={onFilmClick}
          onFilmPlayClick={onFilmPlayClick}
        />
      );
    }

    return (
      <Main
        promoFilm={promoFilm}
        films={films}
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
    const {films, onFilmClick, onFilmPlayClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/film-page">
            <FilmPage
              film={films[0]}
              films={films}
              onFilmClick={onFilmClick}
              onFilmPlayClick={onFilmPlayClick}
            />
          </Route>
          <Route exact path="/player">
            <FilmPlayerWrapper
              film={films[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
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
  activeGenre: state.activeGenre,
  activeFilm: state.activeFilm,
  films: state.films,
  showingFilmsCount: state.showingFilmsCount,
  playingFilm: state.playingFilm,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(evt) {
    evt.preventDefault();
    dispatch(ActionCreator.setGenre(evt.currentTarget.dataset.id));
    dispatch(ActionCreator.resetShowingFilmsCount());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.incrementShowingFilmsCount());
  },
  onFilmClick(index) {
    dispatch(ActionCreator.setActiveFilm(index));
  },
  onFilmPlayClick(film) {
    dispatch(ActionCreator.setPlayingFilm(film));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
