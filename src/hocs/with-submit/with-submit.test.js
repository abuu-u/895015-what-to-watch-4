import React from "react";
import renderer from "react-test-renderer";
import withSubmit from "./with-submit.js";

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withSubmit(MockComponent);

it(`withSubmit is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      onSubmit={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
