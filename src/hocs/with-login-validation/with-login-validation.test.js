import React from "react";
import renderer from "react-test-renderer";
import withLoginValidation from "./with-login.js";

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withLoginValidation(MockComponent);

it(`withFilmPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      onSubmit={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
