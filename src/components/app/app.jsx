import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import FilmPage from "../film-page/film-page.jsx";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filmDetails: null,
    };

    this.onFilmClick = this.onFilmClick.bind(this);
  }

  render() {
    const {promoFilm, films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.state.filmDetails ?
              <FilmPage
                film={this.state.filmDetails}
              /> :
              <Main
                promoFilm={promoFilm}
                films={films}
                onFilmClick={this.onFilmClick}
              />}
          </Route>
          <Route exact path="/film-page">
            <FilmPage
              film={films[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  onFilmClick(evt) {
    evt.preventDefault();
    this.setState({filmDetails: this.props.films[evt.currentTarget.dataset.index]});
  }
}

App.propTypes = {
  promoFilm: PropTypes.shape({
    NAME: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    RELEASE_DATE: PropTypes.number.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired),
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  })).isRequired,
};

export default App;
