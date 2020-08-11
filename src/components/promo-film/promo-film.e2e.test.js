import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PromoFilm from "./promo-film.jsx";

const promoFilm = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  posterImage: `img/bohemian-rhapsody-poster.jpg`,
  backgroundImage: `img/bg-bohemian-rhapsody.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onFilmPlayClick = jest.fn();

  const filmComponent = shallow(
      <PromoFilm
        promoFilm={promoFilm}
        onFilmPlayClick={onFilmPlayClick}
      />
  );

  filmComponent.find(`.btn.btn--play.movie-card__button`).simulate(`click`);

  expect(onFilmPlayClick).toHaveBeenCalledTimes(1);
});
