import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Film from "./film.jsx";

const film = {
  id: 1,
  name: `Fantastic Beasts`,
  previewImage: `img/bohemian-rhapsody.jpg`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handlers be called`, () => {
  const onFilmClick = jest.fn();
  const onFilmMouseOver = jest.fn();
  const onFilmMouseLeave = jest.fn();
  const mouseOverEvt = {
    currentTarget: {dataset: {id: 0}},
  };
  const clickEvt = {
    preventDefault() {},
  };

  const filmComponent = shallow(
      <Film
        film={film}
        onFilmClick={onFilmClick}
        onFilmMouseOver={onFilmMouseOver}
        onFilmMouseLeave={onFilmMouseLeave}
        index={1}
        isActive={false}
      />
  );

  filmComponent.simulate(`click`, clickEvt);
  filmComponent.simulate(`mouseOver`, mouseOverEvt);
  filmComponent.simulate(`mouseLeave`);

  expect(onFilmClick).toHaveBeenCalledTimes(1);
  expect(onFilmMouseOver).toHaveBeenCalledTimes(1);
  expect(onFilmMouseLeave).toHaveBeenCalledTimes(1);
});
