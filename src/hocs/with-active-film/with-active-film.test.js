import React from "react";
import renderer from "react-test-renderer";
import withActiveFilm from "./with-active-film.js";

const MockComponent = () => <div/>;

const MockComponentWrapped = withActiveFilm(MockComponent);

it(`withActiveFilm is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped/>
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
