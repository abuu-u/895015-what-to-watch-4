import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FilmPage from "../film-page/film-page.jsx";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer';

const App = (props) => {
  const {
    promoFilm,
    films,
    activeGenre,
    activeFilm,
    showingFilmsCount,
    onGenreClick,
    onShowMoreClick,
    onFilmClick,
  } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {activeFilm ?
            <FilmPage
              film={activeFilm}
              films={films}
              onFilmClick={onFilmClick}
            /> :
            <Main
              promoFilm={promoFilm}
              films={films}
              activeGenre={activeGenre}
              showingFilmsCount={showingFilmsCount}
              onFilmClick={onFilmClick}
              onGenreClick={onGenreClick}
              onShowMoreClick={onShowMoreClick}
            />}
        </Route>
        <Route exact path="/film-page">
          <FilmPage
            film={films[0]}
            films={films}
            onFilmClick={onFilmClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  activeFilm: PropTypes.object,
  showingFilmsCount: PropTypes.number.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onFilmClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  activeFilm: state.activeFilm,
  films: state.films,
  showingFilmsCount: state.showingFilmsCount,
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
  onFilmClick(evt) {
    dispatch(ActionCreator.setActiveFilm(evt.currentTarget.dataset.index));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
