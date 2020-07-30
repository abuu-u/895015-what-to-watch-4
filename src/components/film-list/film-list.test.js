import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";

const onFilmClick = () => {};
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

it(`Render Main`, () => {
  const tree = renderer
    .create(<FilmList
      films={films}
      activeFilmId={-1}
      onFilmClick={onFilmClick}
      onFilmMouseOver={onFilmMouseOver}
      onFilmMouseLeave={onFilmMouseLeave}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
