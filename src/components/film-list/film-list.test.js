import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";

const onFilmClick = () => {};

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
    .create(<FilmList
      films={films}
      onFilmClick={onFilmClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
