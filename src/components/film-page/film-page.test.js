import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";


const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  scoresCount: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  genre: `Comedy`,
  released: 2014,
  isFavorite: true,
};

const films = [
  {
    genre: `Comedy`,
  },
  {
    genre: `Comedy`,
  },
];

const comments = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`,
  },
  {
    id: 2,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`,
  }
];

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render FilmPage`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FilmPage
            film={film}
            films={films}
            comments={comments}
            authorizationStatus={`AUTH`}
            authInfo={authInfo}
            onFilmAddToFavorites={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
