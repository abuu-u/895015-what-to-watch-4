import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const onFilmClick = () => {};

const onGenreClick = () => {};

const onShowMoreClick = () => {};

const PromoFilm = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
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

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      promoFilm={PromoFilm}
      films={films}
      activeGenre={`Comedy`}
      showingFilmsCount={8}
      onFilmClick={onFilmClick}
      onGenreClick={onGenreClick}
      onShowMoreClick={onShowMoreClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
