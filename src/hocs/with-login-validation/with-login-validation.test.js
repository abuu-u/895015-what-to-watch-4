import React from "react";
import renderer from "react-test-renderer";
import withLoginValidation from "./with-login-validation.js";

const MockComponent = () => <div/>;

const MockComponentWrapped = withLoginValidation(MockComponent);

it(`withFilmPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      onLogin={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
