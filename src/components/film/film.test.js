import React from "react";
import renderer from "react-test-renderer";
import Film from "./film.jsx";

const onHeaderClick = () => {};

const onFilmHover = () => {};

const film = {
  id: 1,
  name: `Fantastic Beasts`,
  previewImage: `img/bohemian-rhapsody.jpg`,
};

it(`Render Film`, () => {
  const tree = renderer
    .create(<Film
      film={film}
      onHeaderClick={onHeaderClick}
      onFilmHover={onFilmHover}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
