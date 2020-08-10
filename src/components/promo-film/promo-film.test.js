import React from "react";
import renderer from "react-test-renderer";
import PromoFilm from "./promo-film.jsx";

const promoFilm = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  posterImage: `img/bohemian-rhapsody-poster.jpg`,
  backgroundImage: `img/bg-bohemian-rhapsody.jpg`,
};

it(`Render PromoFilm`, () => {
  const tree = renderer
    .create(<PromoFilm
      promoFilm={promoFilm}
      onFilmPlayClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
