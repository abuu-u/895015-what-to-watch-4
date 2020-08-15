import React from "react";
import renderer from "react-test-renderer";
import withCommentValidation from "./with-comment-validation.js";

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withCommentValidation(MockComponent);

it(`withSubmit is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      onSubmit={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
