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
  const onFilmClick = jest.fn();
  const onFilmHover = jest.fn();

  const filmComponent = shallow(
      <Film
        film={film}
        onFilmClick={onFilmClick}
        onFilmHover={onFilmHover}
        index={1}
      />
  );

  filmComponent.simulate(`mouseOver`);
  filmComponent.simulate(`click`);

  expect(onFilmClick).toHaveBeenCalledTimes(1);
  expect(onFilmHover).toHaveBeenCalledTimes(1);
});
