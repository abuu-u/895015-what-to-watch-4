import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const PromoFilm = {
  id: 1,
  isFavorite: true,
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  posterImage: `img/bohemian-rhapsody-poster.jpg`,
  backgroundImage: `img/bg-bohemian-rhapsody.jpg`,
};

const films = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Comedy`
  },
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Comedy`
  },
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Comedy`
  },
];

const authInfo = {
  avatarUrl: `img/1.png`
};

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            promoFilm={PromoFilm}
            films={films}
            filmsByGenre={films}
            activeGenre={`Comedy`}
            showingFilmsCount={8}
            authorizationStatus={`AUTH`}
            authInfo={authInfo}
            onGenreClick={() => {}}
            onShowMoreClick={() => {}}
            onPromFilmAddToFavorites={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
