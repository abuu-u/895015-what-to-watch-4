import React from "react";
import renderer from "react-test-renderer";
import PromoFilm from "./promo-film.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

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
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatarUrl: `img/1.png`
};

it(`Render PromoFilm`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authInfo,
    },
  });

  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <PromoFilm
              promoFilm={promoFilm}
              authorizationStatus={`AUTH`}
              onPromFilmAddToFavorites={() => {}}
            />
          </Provider>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
