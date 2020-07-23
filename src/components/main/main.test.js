import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const onFilmClick = () => {};

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
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
  {
    id: 3,
    name: `Macbeth`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
];

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      promoFilm={PromoFilm}
      films={films}
      onFilmClick={onFilmClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
