import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import FilmDescription from "./film-description.jsx";

const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
  genre: `Comedy`,
  released: 2014,
  isFavorite: false
};

it(`Render FilmDescription`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FilmDescription
            film={film}
            authorizationStatus={`AUTH`}
            onFilmPlayClick={() => {}}
            onAddToFavorites={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
