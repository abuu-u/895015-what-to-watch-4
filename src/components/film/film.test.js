import React from "react";
import renderer from "react-test-renderer";
import Film from "./film.jsx";

const onFilmClick = () => {};

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
      onFilmClick={onFilmClick}
      onFilmHover={onFilmHover}
      index={1}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
