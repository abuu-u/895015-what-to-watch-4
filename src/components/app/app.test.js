import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      promoFilm={PromoFilm}
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
