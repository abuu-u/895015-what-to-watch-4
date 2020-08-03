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
                films={films}
                onFilmClick={this.onFilmClick}
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
              films={films}
              onFilmClick={this.onFilmClick}
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
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
};

export default App;
