import React from "react";
import renderer from "react-test-renderer";
import PromoFilm from "./promo-film.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const promoFilm = {
  id: 1,
  isFavorite: true,
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  posterImage: `img/bohemian-rhapsody-poster.jpg`,
  backgroundImage: `img/bg-bohemian-rhapsody.jpg`,
};

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render PromoFilm`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <PromoFilm
            promoFilm={promoFilm}
            authorizationStatus={`AUTH`}
            authInfo={authInfo}
            onPromFilmAddToFavorites={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
