import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

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
            activeFilmId={-1}
            showingFilmsCount={8}
            onFilmMouseOver={()=>{}}
            onFilmMouseLeave={()=>{}}
          />
        </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
