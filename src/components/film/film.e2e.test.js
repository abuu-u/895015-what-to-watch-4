import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Film from "./film.jsx";

const film = {
  name: `Fantastic Beasts`,
  previewImage: `img/bohemian-rhapsody.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();

  const filmComponent = shallow(
      <Film
        film={film}
        onHeaderClick={onHeaderClick}
      />
  );

  const header = filmComponent.find(`.small-movie-card__link`);

  header.simulate(`click`);

  expect(onHeaderClick).toHaveBeenCalledTimes(1);
});
