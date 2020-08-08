import React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.js";

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={{}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
