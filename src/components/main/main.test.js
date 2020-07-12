import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const PromoFilm = {
  NAME: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const films = [
  {
    name: `Fantastic Beasts`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
  {
    name: `Bohemian Rhapsody`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
  {
    name: `Macbeth`,
    previewImage: `img/bohemian-rhapsody.jpg`,
  },
];

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      promoFilm={PromoFilm}
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
