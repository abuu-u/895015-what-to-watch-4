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
  const onFilmMouseOver = jest.fn();
  const onFilmMouseLeave = jest.fn();
  const mouseOverEvt = {
    currentTarget: {dataset: {id: 0}},
  };

  const filmComponent = shallow(
      <Film
        film={film}
        onFilmMouseOver={onFilmMouseOver}
        onFilmMouseLeave={onFilmMouseLeave}
        isActive={false}
      />
  );

  filmComponent.simulate(`mouseOver`, mouseOverEvt);
  filmComponent.simulate(`mouseLeave`);

  expect(onFilmMouseOver).toHaveBeenCalledTimes(1);
  expect(onFilmMouseLeave).toHaveBeenCalledTimes(1);
});
