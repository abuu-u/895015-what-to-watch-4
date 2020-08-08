import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

const onShowMoreClick = () => {};

it(`Render ShowMore`, () => {
  const tree = renderer
    .create(<ShowMore
      onShowMoreClick={onShowMoreClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
