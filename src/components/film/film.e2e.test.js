import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Film from "./film.jsx";

const film = {
  id: 1,
  name: `Fantastic Beasts`,
  previewImage: `img/bohemian-rhapsody.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onHeaderClick = jest.fn();
  const onFilmHover = jest.fn();

  const filmComponent = shallow(
      <Film
        film={film}
        onHeaderClick={onHeaderClick}
        onFilmHover={onFilmHover}
      />
  );

  const header = filmComponent.find(`.small-movie-card__link`);

  header.simulate(`click`);
  filmComponent.simulate(`mouseOver`);

  expect(onHeaderClick).toHaveBeenCalledTimes(1);
  expect(onFilmHover).toHaveBeenCalledTimes(1);
});
