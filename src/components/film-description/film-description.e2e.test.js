import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmDescription from "./film-description.jsx";

const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
  genre: `Comedy`,
  released: 2014,
  isFavorite: false
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onFilmPlayClick = jest.fn();
  const onAddToFavorites = jest.fn();

  const filmComponent = shallow(
      <FilmDescription
        film={film}
        authorizationStatus={`AUTH`}
        onFilmPlayClick={onFilmPlayClick}
        onAddToFavorites={onAddToFavorites}
      />
  );

  filmComponent.find(`.btn.btn--play.movie-card__button`).simulate(`click`);
  filmComponent.find(`.btn.btn--list.movie-card__button`).simulate(`click`);

  expect(onFilmPlayClick).toHaveBeenCalledTimes(1);
  expect(onAddToFavorites).toHaveBeenCalledTimes(1);
});
