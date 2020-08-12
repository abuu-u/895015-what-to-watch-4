import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const onFilmMouseOver = () => {};
const onFilmMouseLeave = () => {};

const films = [
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 1,
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Render FilmList`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FilmList
            films={films}
            showingFilmsCount={8}
            activeFilmId={-1}
            onFilmMouseOver={onFilmMouseOver}
            onFilmMouseLeave={onFilmMouseLeave}
          />
        </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
